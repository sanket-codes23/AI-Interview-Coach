const Groq = require("groq-sdk");
const { z } = require("zod");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const generateResumeHTML = require("../templates/resume.template");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .describe(
            "A score between 0 and 100 indicating how well the candidate matches the job description."
        ),

    technicalQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("A realistic technical interview question."),

            intention: z
                .string()
                .describe("Why the interviewer is asking this question."),

            keyPoints: z
                .array(z.string())
                .describe(
                    "Important concepts, points, examples and trade-offs the candidate should cover while answering."
                ),

            modelAnswer: z
                .string()
                .describe(
                    "A complete interview-quality answer that the candidate can directly speak in the interview. It should be detailed, well structured, include examples, trade-offs and real-world scenarios whenever appropriate."
                ),
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("A realistic behavioral interview question."),

            intention: z
                .string()
                .describe("Why the interviewer is asking this question."),

            keyPoints: z
                .array(z.string())
                .describe(
                    "Important things the candidate should mention while answering."
                ),

            modelAnswer: z
                .string()
                .describe(
                    "A complete STAR-format answer that sounds natural and professional."
                ),
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),

            severity: z.enum([
                "low",
                "medium",
                "high",
            ]),
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),

            focus: z.string(),

            tasks: z.array(z.string()),
        })
    ),

    title: z.string(),
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {

const prompt = `
You are an experienced Recruiter, Technical Interviewer, Hiring Manager and Career Coach.

Your task is to analyze the candidate's Resume, Self Description and Job Description to create a personalized interview preparation report.

IMPORTANT INSTRUCTIONS

- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap the JSON inside \`\`\`.
- Do NOT add explanations outside the JSON.
- Do NOT invent projects, experience or skills that are not present in the resume.
- Infer the job title from the job description.
- Tailor every question according to the target role.
- Make the interview report realistic and similar to what top companies ask.

Return JSON EXACTLY in this format:

{
  "title": "",
  "matchScore": 0,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "keyPoints": [],
      "modelAnswer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "keyPoints": [],
      "modelAnswer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": ""
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": []
    }
  ]
}

------------------------------------------------

1. Match Score

Give a score between 0 and 100 based on:

- Skills
- Projects
- Technologies
- Education
- Relevant Experience
- Overall suitability for the role

------------------------------------------------

2. Technical Questions

Generate 8-10 realistic interview questions.

Questions should:

- Start from easy.
- Gradually increase difficulty.
- Be specific to the target role.
- Include practical and scenario-based questions.
- Include conceptual questions.
- Include coding/system design questions whenever appropriate.

For EACH technical question provide:

Question

Interviewer Intention

Key Points

Key Points should contain 5-8 concise bullet points describing:

- Important concepts
- Important definitions
- Real-world examples
- Trade-offs
- Common mistakes
- Best practices

Model Answer

The model answer should:

- Be 150-300 words.
- Sound like a real interview answer.
- Explain concepts clearly.
- Include examples.
- Mention trade-offs.
- Mention practical use cases.
- Be something the candidate can directly speak.

Do NOT write:

"The candidate should..."

Instead write the answer directly.

------------------------------------------------

3. Behavioral Questions

Generate 5 behavioral questions.

For EACH behavioral question provide:

Question

Interviewer Intention

Key Points

Model Answer

The model answer should:

- Follow the STAR framework naturally.
- Sound realistic.
- Be conversational.
- Be something the candidate can directly say.

------------------------------------------------

4. Skill Gaps

Mention only genuine missing skills.

Severity must be:

low

medium

high

------------------------------------------------

5. Preparation Plan

Generate a realistic 7-day preparation roadmap.

Each day should contain:

- Focus Area
- 4-6 practical tasks

------------------------------------------------

Resume:

${resume}

------------------------------------------------

Self Description:

${selfDescription}

------------------------------------------------

Job Description:

${jobDescription}

`;

    try {

        const response = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            temperature: 0.3,

            response_format: {
                type: "json_object",
            },

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const text = response.choices[0].message.content;

        const json = JSON.parse(text);

        return interviewReportSchema.parse(json);

    } catch (error) {

        console.error("Interview Report Error:", error);

        throw new Error("Failed to generate interview report.");
    }

}

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    });

    await browser.close();

    return pdfBuffer;
}

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}) {

    

    const resumePdfSchema = z.object({

    name: z.string(),

    title: z.string(),

    summary: z.string(),

    skills: z.object({

        languages: z.array(z.string()),

        frameworks: z.array(z.string()),

        databases: z.array(z.string()),

        tools: z.array(z.string())

    }),

    experience: z.array(

        z.object({

            company: z.string(),

            role: z.string(),

            duration: z.string(),

            points: z.array(z.string())

        })

    ),

    education: z.array(

        z.object({

            degree: z.string(),

            college: z.string(),

            year: z.string(),

            cgpa: z.string()

        })

    ),

    projects: z.array(

        z.object({

            name: z.string(),

            description: z.array(z.string())

        })

    ),

    achievements: z.array(z.string())

})

 const prompt = `
You are an expert ATS Resume Writer, Technical Recruiter, and Hiring Manager.

Your task is to rewrite and optimize the candidate's resume for the given job description.

IMPORTANT RULES

- Return ONLY valid JSON.
- Do NOT return HTML.
- Do NOT return Markdown.
- Do NOT wrap the response in \`\`\`.
- Do NOT invent any information that is not present in the candidate's resume or self description.
- Improve wording professionally.
- Quantify achievements only if numbers are explicitly mentioned.
- Tailor the resume towards the job description.
- Prioritize relevant skills and projects.
- Keep the summary concise (3-5 lines).
- Use strong action verbs.
- Ensure the resume is ATS-friendly.

Return JSON exactly in this format:

{
  "name":"",
  "title":"",
  "summary":"",
  "skills":{
      "languages":[],
      "frameworks":[],
      "databases":[],
      "tools":[]
  },
  "experience":[
      {
          "company":"",
          "role":"",
          "duration":"",
          "points":[]
      }
  ],
  "education":[
      {
          "degree":"",
          "college":"",
          "year":"",
          "cgpa":""
      }
  ],
  "projects":[
      {
          "name":"",
          "description":[]
      }
  ],
  "achievements":[]
}

Candidate Resume:

${resume}

Self Description:

${selfDescription}

Job Description:

${jobDescription}
`;
    try {

        const response = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            temperature: 0.2,

            response_format: {
                type: "json_object",
            },

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const text = response.choices[0].message.content.trim();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        const json = JSON.parse(text.slice(start, end + 1));

       const validated = resumePdfSchema.parse(json);

const html = generateResumeHTML(validated);

const pdfBuffer = await generatePdfFromHtml(html);

return pdfBuffer;

    } catch (error) {

        console.error("Resume Generation Error:", error);

        throw new Error("Failed to generate resume PDF.");

    }

}

module.exports = {
    generateInterviewReport,
    generateResumePdf,
};