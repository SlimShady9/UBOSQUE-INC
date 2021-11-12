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
        Iterator iterator=sheet.iterator();
		
		while(iterator.hasNext())
		{
			XSSFRow row=(XSSFRow) iterator.next();
			
			Iterator cellIterator=row.cellIterator();
			
			while(cellIterator.hasNext())
			{
				XSSFCell cell=(XSSFCell) cellIterator.next();
				
				switch(cell.getCellType())
				{
				case STRING: System.out.print(cell.getStringCellValue()); break;
				case NUMERIC: System.out.print(cell.getNumericCellValue());break;
				case BOOLEAN: System.out.print(cell.getBooleanCellValue()); break;
				}
				System.out.print(" |  ");
			}
			System.out.println();
		}
    }
}