const puppeteer = require('puppeteer');
const fs = require("fs");
const xlsx = require('node-xlsx').default;

const site = "https://nexxos.prop360.cl/index.aspx";
const input = {
  mail: "contacto@nexxos.cl",
  pass: "Nexxos2020",
};

(async () => {
  try{
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(site);
    console.log("Login - Home");
    
    await page.type("#tbMail", input.mail, { delay: 100 });
    await page.type("#tbPassword", input.pass, { delay: 100 });
    await page.click("#botLogin");
    console.log("Usuario y contraseña enviados, Esperando respuesta...");
    
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    console.log("Dashboard");
    
    await page.goto("https://nexxos.prop360.cl/backOffice/propiedades/propiedades.aspx");
    console.log("Propiedades");
    
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './downloads', name: "some.xml" });
    await page.click("#listadoExcel");
    console.log("Descargando...");
    await page.waitFor(60000);

    console.log("Guardado en /RUTA_DEL_PROYECTO/dowloads");  
    await browser.close();

    const files = await fs.readdirSync('./downloads');
    console.log("FILES", files);

    const result = xlsx.parse(fs.readFileSync(`downloads/${files[0]}`));
    console.log("RESULT", result[0].data[1]);
  }catch(e){
    console.log("ERROR",e);
    await browser.close();
  }
})();