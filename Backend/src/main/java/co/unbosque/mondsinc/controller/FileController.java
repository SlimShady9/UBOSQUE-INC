package co.unbosque.mondsinc.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.Iterator;


import java.io.File;
import java.io.FileInputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;

import org.apache.poi.xssf.usermodel.*;
@RestController
@CrossOrigin(origins = {"https://localhost:3000", "https://mondsinc.vercel.app", "http://localhost:3000"})
@RequestMapping("/api/v1/file")
public class FileController {

    @RequestMapping(value = "/upload/" , method = RequestMethod.POST,
    consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Map<String, String>>
    uploadDocument(@RequestPart String solicitud, @RequestParam String referencia, 
    @RequestParam MultipartFile documento) {
        
        HashMap<String, String> daticos = new HashMap<>();
        try {
            System.out.println(solicitud + referencia);
            procesarExcel(documento.getInputStream());
            daticos.put("Exitos", "Zhi");
        } catch (IOException e) {
            e.printStackTrace();
            daticos.put("Mal", ":c");
            return ResponseEntity.internalServerError().body(daticos);
        }
        return ResponseEntity.ok().body(daticos);
    }

    public void procesarExcel(InputStream documento)
    throws IOException{
        
        XSSFWorkbook excel = new XSSFWorkbook(documento);
  
        //Get first/desired sheet from the workbook
        XSSFSheet sheet = excel.getSheetAt(0);

		Iterator iterator=sheet.iterator();
		
        int nrow = 0; 
        String tipoDoc = "";
        String numDoc = "";
        String razon = "";
        String referencia = "";
        String solicitud = "";
		while(iterator.hasNext())
		{
            nrow++;
            int column = 0;
			XSSFRow row=(XSSFRow) iterator.next();
			
			Iterator cellIterator=row.cellIterator();
			
			while(cellIterator.hasNext())
			{
                column++;
                String valor = "";
				XSSFCell cell=(XSSFCell) cellIterator.next();
	
				switch(cell.getCellType())
				{
                case STRING: System.out.print(cell.getStringCellValue()+"'"+nrow+"'"+column); break;
                case NUMERIC: System.out.print(cell.getNumericCellValue()+"Number'"+nrow+"'"+column);break;
                //case BOOLEAN: System.out.print(cell.getBooleanCellValue()+"'"+nrow+"'"+column); break;
                //case STRING: valor = cell.getStringCellValue(); break;
                //case NUMERIC: valor = String.valueOf(cell.getNumericCellValue()); valor = valor.substring(0, valor.length() - 2); valor.replace(".","");  break;
                //case BOOLEAN: System.out.print(cell.getBooleanCellValue()+"'"+nrow+"'"+column); break;
				}
            
               System.out.println(valor);

                if (nrow == 3) {
                    
                    switch(column)
                    {
                        case 1: tipoDoc = valor; break;
                        case 2: numDoc = valor; break;
                        case 3: razon = valor; break;
                        case 4: referencia = valor; break;
                        case 5: solicitud = valor; break;
                    }
                }
				System.out.print(" |  ");
			}
			System.out.println();

		}

        System.out.println("Tipo de documento:"+tipoDoc+", Numero Documento:"+numDoc+", Razon social:"+razon+", Referencia:"+referencia+", Solicitud:"+solicitud);
    }
}