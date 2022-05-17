import React from "react";
import { FormattedMessage } from "react-intl";
import ContactForm from "./ContactForm";
import "./Main.scss";

const Main = ({ data }) => {
  return (
    <main>
      <section id="projects" className="projects">
        <h3>
          <FormattedMessage id="app.section.title.projects" />
        </h3>
        <hr />
        <div className="section-content">
          {data.projects.map((project) => (
            <React.Fragment key={`project-${project.title.trim()}`}>
              <h6>-{project.date}</h6>
              <h4>
                {project.title}
                {project.links.map((item) => (
                  <React.Fragment key={`project__link-${item.caption}`}>
                    {" - "}
                    <a href={item.href} target={item.target}>
                      {item.caption}
                    </a>
                  </React.Fragment>
                ))}
              </h4>
              <img src={project.image} alt={project.title} />
              <p dangerouslySetInnerHTML={{ __html: project.description }} />
              <div className="bullet-container">
                {project.bullets.map((blt) => (
                  <div key={`project__bullet-${blt.title}`}>
                    <h5>{blt.title}</h5>
                    <ul>
                      {blt.items.map((item, idx) => (
                        <li key={`feaure-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section id="skills" className="skills">
        <h3>
          <FormattedMessage id="app.section.title.skills" />
        </h3>
        <hr />
        <div className="section-content">
          <ul>
            {data.skills.map(
              (item, idx) =>
                !item.hidden && (
                  <li key={`skill-${idx}`}>
                    {item.title} <span>({item.level})</span>
                  </li>
                )
            )}
          </ul>
        </div>
      </section>

      <section id="about" className="about">
        <h3>
          <FormattedMessage id="app.section.title.about" />
        </h3>
        <hr />
        <div className="section-content">
          <p dangerouslySetInnerHTML={{ __html: data.about.text }} />
        </div>
      </section>

      <section id="contact" className="contact">
        <h3>
          <FormattedMessage id="app.section.title.contact" />
        </h3>
        <hr />
        <div className="section-content">
          <p dangerouslySetInnerHTML={{ __html: data.contact.text }} />
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Main;
