import React, { useState, useRef, useCallback, useContext } from "react";
import { MathJax } from "better-react-mathjax"; // Used to render Latex
import { toPng, toBlob } from "html-to-image"; // Used to make png image
import { Context } from "../context/context.jsx"; // Used to change dark mode
import { FiDownload, FiClipboard } from "react-icons/fi"; // Icons
import { ToastContainer, toast } from "react-toastify"; // Toast with error or success messages
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Editor = () => {
  const { checked } = useContext(Context); // Dark mode

  const ref = useRef(null);

  /* Function to download png */
  const downloadPng = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      cacheBust: true,
      backgroundColor: `${checked ? "000" : "FFF"}`,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Text2Math.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  /* Aux function to copy to clipboard */

  const blobCreator = () => {
    return new Promise((resolve, reject) => {
      try {
        toBlob(ref.current, {
          cacheBust: true,
          backgroundColor: `${checked ? "000" : "FFF"}`,
        }).then((blob) => {
          resolve(blob);
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  /* Copy to clipboard function */

  async function copyToClipboard() {
    navigator.clipboard
      .write([
        new window.ClipboardItem({
          "image/png": new Promise(async (resolve, reject) => {
            try {
              const blob = await blobCreator();
              resolve(new Blob([blob], { type: "image/png" }));
            } catch (err) {
              reject(err);
            }
          }),
        }),
      ])
      .then(() =>
        toast("Imagen copiada correctamente", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        })
      )
      .catch((err) =>
        toast("Error no se ha podido copiar la imagen", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        })
      );
  }

  /* State to write math */

  const [text, setText] = useState("");

  const handle = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="app">
      <Navbar />

      <div className="main">
        <div className="editor">
          <div className="left-side">
            <form>
              <textarea
                spellCheck="false"
                type="text"
                className="text"
                onChange={(e) => handle(e)}
              />
            </form>
            <div className="buttonrow left">
              <button className="option" onClick={downloadPng}>
                <FiDownload size="32" color="white" />
              </button>
              <p className="subtext">Descargar png</p>
            </div>
          </div>

          <div className="right-side">
            <div className="text">
              <div ref={ref}>
                <MathJax dynamic>{text}</MathJax>
              </div>
            </div>

            <div className="buttonrow right">
              <button className="option" onClick={copyToClipboard}>
                <FiClipboard size="32" color="white" />
              </button>
              <p className="subtext">Copiar al portapapeles</p>
            </div>
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          toastStyle={{
            backgroundColor: `${checked ? "#0A84FF" : "#056DFA"}`,
            color: "white",
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
