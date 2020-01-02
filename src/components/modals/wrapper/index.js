import React from "react";
import c from "classnames";

import classes from "./modal.module.css";

export default class Modal extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    gsap.to(this.refs.container, 0.3, { autoAlpha: 1 });
    // eslint-disable-next-line
    gsap.fromTo(
      this.refs.modal,
      0.3,
      { delay: 0.1, autoAlpha: 0, top: 15 },
      { autoAlpha: 1, top: 0 }
    );
  }

  close = () => {
    // eslint-disable-next-line
    gsap.to(this.refs.container, 0.3, { delay: 0.1, autoAlpha: 0 });
    // eslint-disable-next-line
    gsap.to(this.refs.modal, 0.3, { autoAlpha: 0, top: 15 });
    setTimeout(this.props.close, 300);
  };

  render() {
    let disabledButtonClasses = this.props.formCompleted
      ? c(classes.SaveBtn, "waves-effect waves-light")
      : c(classes.SaveBtn, classes.Disabled);

    return (
      <div
        ref="container"
        className={c(classes.Container, this.props.className)}
      >
        <div className={classes.Overlay} />
        <div ref="modal" className={classes.Modal} style={this.props.style}>
          {this.props.children}
          <div className={classes.Footer}>
            <button
              onClick={this.close}
              className={c(classes.CloseBtn, "waves-effect")}
            >
              Close
            </button>
            <button
              onClick={this.props.formCompleted ? this.props.save : null}
              style={{ marginLeft: 20 }}
              className={disabledButtonClasses}
            >
              {this.props.button}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
