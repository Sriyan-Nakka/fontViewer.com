document
  .querySelector("#fontFileHead")
  .addEventListener("change", function (event) {
    event.preventDefault();
    const file = event.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    const headFontName = "Font_" + Date.now();

    const css = `
        @font-face {
          font-family: "${headFontName}";
          src: url("${blobUrl}");
        }

        #headerPara {
          font-family: "${headFontName}";
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  });

document
  .querySelector("#fontFileBody")
  .addEventListener("change", function (event) {
    event.preventDefault();
    const file = event.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    const bodyFontName = "Font_" + Date.now();

    const css = `
        @font-face {
          font-family: "${bodyFontName}";
          src: url("${blobUrl}");
        }

        #bodyPara {
          font-family: "${bodyFontName}";
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  });

document.querySelector("#headBodyPreviewButton").onclick = function () {
  document.querySelector("#bodyFontFilePara").style.display = "block";
  document.querySelector("#bodyPara").style.display = "block";
  document.querySelector("#headerPara").innerHTML =
    "<h1>This is a header.</h1>";
};

document.querySelector("#resetButton").onclick = function () {
  const css = `
        #bodyPara, #headerPara {
          font-family: serif;
        }
      `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};
