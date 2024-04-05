import React from "react";

const Section = (props) => {
    // Converto props.children in un array
    const childrenArray = React.Children.toArray(props.children);
  return (
    <section className={props.className}>
      <h2>{props.title}</h2>
      <>
        {childrenArray.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </>
    </section>
  );
};

export default Section;
