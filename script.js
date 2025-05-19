let headBodyPreview = false;
let customTextSelection = false;
let css;

document
  .querySelector("#fontFileHead")
  .addEventListener("change", function (event) {
    event.preventDefault();
    const file = event.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    const headFontName = "Font_" + Date.now();

    if (customTextSelection) {
      css = `
        @font-face {
          font-family: "${headFontName}";
          src: url("${blobUrl}");
        }

        #customTextPara {
          font-family: "${headFontName}";
        }
      `;
    } else {
      css = `
        @font-face {
          font-family: "${headFontName}";
          src: url("${blobUrl}");
        }

        #headerPara {
          font-family: "${headFontName}";
        }
      `;
    }

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

    css = `
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
  document.querySelector("#fontFileBody").value = "";
  document.querySelector("#fontFileHead").value = "";
  if (!headBodyPreview) {
    headBodyPreview = true;
    document.querySelector("#headFontFileSpan").textContent =
      "Choose the font you want to preview for header:";
    document.querySelector("#headBodyPreviewButton").textContent =
      "Revert to sample sentence (Esc key)";
    document.querySelector("#bodyFontFilePara").style.display = "block";
    document.querySelector("#customTextButton").style.display = "none";
    document.querySelector("#bodyPara").style.display = "block";
    document.querySelector("#headerPara").innerHTML =
      "<h1>This is a header.</h1>";

    css = `
    #bodyPara, #headerPara {
      font-family: serif;
      }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  } else if (headBodyPreview) {
    headBodyPreview = false;
    document.querySelector("#headFontFileSpan").textContent =
      "Choose the font you want to preview:";
    document.querySelector("#headBodyPreviewButton").textContent =
      "Preview for header and body sentences";
    document.querySelector("#bodyFontFilePara").style.display = "none";
    document.querySelector("#bodyPara").style.display = "none";
    document.querySelector("#headerPara").innerHTML =
      "the quick brown fox jumped over the lazy dog. <br> THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG.";
    document.querySelector("#customTextButton").style.display = "inline-block";
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";

    css = `
        #bodyPara, #headerPara {
          font-family: serif;
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
};

document.querySelector("#customTextButton").onclick = function () {
  if (!customTextSelection) {
    customTextSelection = true;
    document.querySelector("#customTextInput").style.display = "block";
    document.querySelector("#customTextarea").focus();
    document.querySelector("#customTextPara").style.display = "block";
    document.querySelector("#headBodyPreviewButton").style.display = "none";
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";
    document.querySelector("#contentContainer").style.display = "none";
    document.querySelector("#customTextButton").textContent =
      "Revert to sample sentence (Esc key)";

    document
      .querySelector("#customTextarea")
      .addEventListener("keyup", function () {
        let customText = document.querySelector("#customTextarea").value;
        document.querySelector("#customTextPara").textContent = customText;
      });
  } else if (customTextSelection) {
    customTextSelection = false;
    document.querySelector("#customTextInput").style.display = "none";
    document.querySelector("#customTextPara").style.display = "none";
    document.querySelector("#headBodyPreviewButton").style.display =
      "inline-block";
    document.querySelector("#contentContainer").style.display = "block";
    document.querySelector("#customTextButton").textContent =
      "Preview font with custom text";
    document.querySelector("#customTextPara").textContent = "";
    document.querySelector("#customTextarea").value = "";
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";
    css = `
        #headerPara, #customTextPara {
          font-family: serif;
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
};

document.querySelector("#resetButton").onclick = function () {
  document.querySelector("#fontFileBody").value = "";
  document.querySelector("#fontFileHead").value = "";

  css = `
        #bodyPara, #headerPara, #customTextPara {
          font-family: serif;
        }
      `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";

    css = `
        #bodyPara, #headerPara, #customTextPara {
          font-family: serif;
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  } else if (e.key === "Escape" && customTextSelection) {
    customTextSelection = false;
    document.querySelector("#customTextInput").style.display = "none";
    document.querySelector("#customTextPara").style.display = "none";
    document.querySelector("#headBodyPreviewButton").style.display =
      "inline-block";
    document.querySelector("#contentContainer").style.display = "block";
    document.querySelector("#resetButton").style.display = "inline-block";
    document.querySelector("#customTextButton").textContent =
      "Preview font with custom text";
    document.querySelector("#customTextPara").textContent = "";
    document.querySelector("#customTextarea").value = "";
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";
    css = `
        #bodyPara, #headerPara {
          font-family: serif;
        }
      `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  } else if (e.key === "Escape" && headBodyPreview) {
    headBodyPreview = false;
    document.querySelector("#headFontFileSpan").textContent =
      "Choose the font you want to preview:";
    document.querySelector("#headBodyPreviewButton").textContent =
      "Preview for header and body sentences";
    document.querySelector("#bodyFontFilePara").style.display = "none";
    document.querySelector("#bodyPara").style.display = "none";
    document.querySelector("#headerPara").innerHTML =
      "the quick brown fox jumped over the lazy dog. <br> THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG.";
    document.querySelector("#customTextButton").style.display = "inline-block";
    document.querySelector("#fontFileBody").value = "";
    document.querySelector("#fontFileHead").value = "";

    css = `
        #bodyPara, #headerPara {
          font-family: serif;
        }
      `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
});

document.querySelector("#customTextarea").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
