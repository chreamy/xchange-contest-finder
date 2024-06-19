import React, { Fragment, useEffect, useState } from "react";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    setPortalElement(document.getElementById("overlays"));
  }, []);
 // Or render some fallback UI.

  return (
    <Fragment>
        <Backdrop onClose={props.onClose} />
        <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
