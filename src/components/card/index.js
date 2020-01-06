import React, { useContext } from "react";
import c from "classnames";
import Tilt from "react-tilt";
import { AppContext } from "../../context";
import classes from "./card.module.css";

function DeleteButton(props) {
  let { bookmarks, setBookmarks } = useContext(AppContext);

  const _handleDelete = event => {
    let data = event.target.offsetParent.offsetParent.dataset.id;
    let { title } = JSON.parse(decodeURIComponent(data));

    let _bookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
    setBookmarks(_bookmarks);
  };

  return (
    <button
      className={c(classes.DeleteButton, "waves-light")}
      onClick={_handleDelete}
    >
      <i className="material-icons">delete</i>
    </button>
  );
}

export default function Card(props) {
  let { editMode } = useContext(AppContext);
  let id = encodeURIComponent(JSON.stringify(props.bookmark));

  /* eslint-disable */
  return (
    <div data-id={id} className={classes.Card}>
      {editMode && !props.hideDelete ? <DeleteButton /> : null}
      <Tilt
        className={classes.Tilt}
        options={{ max: 20, speed: 3000, scale: 1.03 }}
      >
        <a
          className={c(classes.Link, props.className)}
          href={editMode ? null : props.bookmark.link}
          style={{ backgroundColor: props.bookmark.color || "" }}
          onClick={props.onClick}
        >
          <img className={classes.Icon} src={props.bookmark.icon} alt="" />
        </a>
      </Tilt>
      <h3 className={props.demo ? classes.TitleDemo : classes.Title}>
        {props.bookmark.title}
      </h3>
    </div>
  );
}
