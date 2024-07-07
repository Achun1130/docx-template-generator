import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions';
import saveAs from 'file-saver';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils';

export function renderDocx(url: string, data?: any): void {
  PizZipUtils.getBinaryContent(url, (error: Error, content) => {
    if (error) {
      throw error;
    }

    const zip = new PizZip(content);
    const docx = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressionParser
    });

    docx.render(data);

    const output = docx.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(output, 'output.docx');
  });
}
