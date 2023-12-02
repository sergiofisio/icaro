import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  UnicoThemeBuilder,
  UnicoConfig,
  LocaleTypes,
} from "./UnicoCheckBuilder.min.js";

const unicoCameraBuilder = new UnicoCheckBuilder();
unicoCameraBuilder.setResourceDirectory("/resources");
unicoCameraBuilder.setModelsPath("http://localhost:8080/models");

unicoCameraBuilder.setLocale(LocaleTypes.PT_BR);

const unicoTheme = new UnicoThemeBuilder()
  .setColorSilhouetteSuccess("#0384fc")
  .setColorSilhouetteError("#D50000")
  .setColorSilhouetteNeutral("#fcfcfc")
  .setBackgroundColor("#dff1f5")
  .setColorText("#0384fc")
  .setBackgroundColorComponents("#0384fc")
  .setColorTextComponents("#dff1f5")
  .setBackgroundColorButtons("#0384fc")
  .setColorTextButtons("#dff1f5")
  .setBackgroundColorBoxMessage("#fff")
  .setColorTextBoxMessage("#000")
  .setHtmlPopupLoading(
    `<div style="position: absolute; top: 45%; right: 50%; transform:
translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`
  )
  .build();

unicoCameraBuilder.setTheme(unicoTheme);

const callback = {
  on: {
    success: (obj) => {
      console.log(obj.base64);
      console.log(obj.encrypted);
    },
    error: (error) => {
      console.error(error);
    },
  },
};

const unicoCamera = unicoCameraBuilder.build();

const config = new UnicoConfig()
  .setProjectNumber("9554769147211182494996")
  .setProjectId("sbox_web")
  .setMobileSdkAppId("3:526095:js")
  .setHostname("http://localhost:8080")
  .setHostInfo(
    "nRMqSJJeWMZ0K4n9Dxs/Zhb5RslAxes+pmH0gJgmVtbCkO5ZnxCWzlksNtcT5D/U"
  )
  .setHostKey(
    "nAOH8qlvzhU4hS2TkCGQGl2wv0+pXRYTcs8O1GYIvmS/fzrYda4y1HHDm1jjnmyz"
  );

async function camera() {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function () {
    unicoCamera
      .prepareSelfieCamera(config, SelfieCameraTypes.NORMAL)
      .then((cameraOpener) => {
        cameraOpener.open(callback);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

camera();
