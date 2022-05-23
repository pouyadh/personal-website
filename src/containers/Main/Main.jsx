import React from "react";
import { FormattedMessage } from "react-intl";
import ContactForm from "./ContactForm";
import "./Main.scss";
import { motion } from "framer-motion";

const motionVariants = {
  ul: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  li: {
    hidden: { opacity: 0, x: "-100px" },
    show: { opacity: 1, x: "0px" },
  },
  content: {
    hidden: { opacity: 0, x: "10%" },
    show: { opacity: 1, x: "0%", transition: { duration: 1.3 } },
  },
};

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
            <motion.div
              key={`project-${project.title.trim()}`}
              initial="hidden"
              whileInView="show"
              variants={motionVariants.content}
            >
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
              <div className="project-wrapper">
                <div>
                  <img src={project.image} alt={project.title} />
                </div>
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  <div className="bullet-container">
                    {project.bullets.map((blt) => (
                      <div key={`project__bullet-${blt.title}`}>
                        <h5>{blt.title}</h5>
                        <motion.ul
                          variants={motionVariants.ul}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 1 }}
                        >
                          {blt.items.map((item, idx) => (
                            <motion.li
                              key={`feaure-${idx}`}
                              variants={motionVariants.li}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className="skills">
        <h3>
          <FormattedMessage id="app.section.title.skills" />
        </h3>
        <hr />
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          variants={motionVariants.content}
        >
          <motion.ul
            className="skills-list"
            variants={motionVariants.ul}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {data.skills.map(
              (item, idx) =>
                !item.hidden && (
                  <motion.li key={`skill-${idx}`} variants={motionVariants.li}>
                    {item.title} <span>({item.level})</span>
                  </motion.li>
                )
            )}
          </motion.ul>
        </motion.div>
      </section>

      <section id="about" className="about">
        <h3>
          <FormattedMessage id="app.section.title.about" />
        </h3>
        <hr />
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          variants={motionVariants.content}
        >
          <p dangerouslySetInnerHTML={{ __html: data.about.text }} />
        </motion.div>
      </section>

      <section id="contact" className="contact">
        <h3>
          <FormattedMessage id="app.section.title.contact" />
        </h3>
        <hr />
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={motionVariants.content}
          className="section-content"
        >
          <p dangerouslySetInnerHTML={{ __html: data.contact.text }} />
          <ContactForm />
        </motion.div>
      </section>
    </main>
  );
};

export default Main;
