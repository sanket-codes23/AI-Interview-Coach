function generateResumeHTML(data) {

    return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:Arial,Helvetica,sans-serif;

    color:#222;

    padding:45px;

    line-height:1.5;
}

.header{

    text-align:center;

    margin-bottom:28px;
}

.header h1{

    font-size:32px;

    color:#1f2937;

    letter-spacing:1px;
}

.header h2{

    margin-top:6px;

    font-size:18px;

    color:#2563eb;

    font-weight:500;
}

.section{

    margin-top:28px;
}

.section-title{

    font-size:18px;

    font-weight:bold;

    color:#2563eb;

    border-bottom:2px solid #2563eb;

    padding-bottom:6px;

    margin-bottom:12px;

    text-transform:uppercase;
}

.summary{

    text-align:justify;
}

.skills{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:10px;
}

.skill{

    margin-bottom:8px;
}

.project{

    margin-bottom:18px;
}

.project-title{

    font-weight:bold;

    font-size:16px;
}

ul{

    margin-left:20px;

    margin-top:8px;
}

li{

    margin-bottom:6px;
}

.education{

    margin-bottom:15px;
}

.exp{

    margin-bottom:18px;
}

.footer{

    margin-top:40px;

    text-align:center;

    color:#888;

    font-size:12px;
}

</style>

</head>

<body>

<div class="header">

<h1>${data.name}</h1>

<h2>${data.title}</h2>

</div>


<div class="section">

<div class="section-title">

Professional Summary

</div>

<div class="summary">

${data.summary}

</div>

</div>


<div class="section">

<div class="section-title">

Technical Skills

</div>

<div class="skills">

<div class="skill">

<strong>Languages</strong><br>

${data.skills.languages.join(", ")}

</div>

<div class="skill">

<strong>Frameworks</strong><br>

${data.skills.frameworks.join(", ")}

</div>

<div class="skill">

<strong>Databases</strong><br>

${data.skills.databases.join(", ")}

</div>

<div class="skill">

<strong>Tools</strong><br>

${data.skills.tools.join(", ")}

</div>

</div>

</div>


<div class="section">

<div class="section-title">

Projects

</div>

${data.projects.map(project=>`

<div class="project">

<div class="project-title">

${project.name}

</div>

<ul>

${project.description.map(point=>`<li>${point}</li>`).join("")}

</ul>

</div>

`).join("")}

</div>


<div class="section">

<div class="section-title">

Experience

</div>

${data.experience.map(exp=>`

<div class="exp">

<strong>${exp.role}</strong>

<br>

${exp.company}

&nbsp;&nbsp;

(${exp.duration})

<ul>

${exp.points.map(point=>`<li>${point}</li>`).join("")}

</ul>

</div>

`).join("")}

</div>


<div class="section">

<div class="section-title">

Education

</div>

${data.education.map(edu=>`

<div class="education">

<strong>${edu.degree}</strong>

<br>

${edu.college}

<br>

${edu.year}

&nbsp;&nbsp;

CGPA : ${edu.cgpa}

</div>

`).join("")}

</div>


<div class="section">

<div class="section-title">

Achievements

</div>

<ul>

${data.achievements.map(a=>`<li>${a}</li>`).join("")}

</ul>

</div>

<div class="footer">

Generated using AI Resume Optimizer

</div>

</body>

</html>

`;

}

module.exports = generateResumeHTML;