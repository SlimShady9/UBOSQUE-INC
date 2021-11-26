package co.unbosque.mondsinc.controller;

import java.io.IOException;
import java.io.InputStream;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import co.unbosque.mondsinc.models.Concept;
import co.unbosque.mondsinc.models.Documment;
import co.unbosque.mondsinc.models.Order;
import co.unbosque.mondsinc.models.User;
import co.unbosque.mondsinc.repository.ConceptRepository;
import co.unbosque.mondsinc.repository.DocummentRepository;
import co.unbosque.mondsinc.repository.OrderRepository;
import co.unbosque.mondsinc.repository.UserRepository;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;

import org.apache.poi.xssf.usermodel.*;
@RestController
@CrossOrigin(origins = {"https://localhost:3000", "https://mondsinc.vercel.app", "http://localhost:3000"})
@RequestMapping("/api/v1/file")
public class FileController {

    @Autowired
    private ConceptRepository conceptRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private DocummentRepository docummentRepository;
    @Autowired
    private UserRepository userRepository;
    
    @RequestMapping(value = "/upload/" , method = RequestMethod.POST,
    consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Map<String, String>>
    uploadDocument(@RequestPart String userId, @RequestParam MultipartFile documento) {
        
        HashMap<String, String> daticos = new HashMap<>();
        try {
            procesarExcel(documento.getInputStream(), userId);
            daticos.put("Exitos", "Zhi");
        } catch (IOException e) {
            e.printStackTrace();
            daticos.put("Mal", ":c");
            return ResponseEntity.internalServerError().body(daticos);
        }
        return ResponseEntity.ok().body(daticos);
    }

    public void procesarExcel(InputStream documento, String userId)
    throws IOException{
        
        XSSFWorkbook excel = new XSSFWorkbook(documento);
        XSSFSheet sheet = excel.getSheetAt(0);
  
		int rows=sheet.getLastRowNum();
		int cols=sheet.getRow(1).getLastCellNum();

        double SMMLV = 908526;
        String tipoDoc = "";
        String numDoc = "";
        String razon = "";
        String referencia = "";
        String solicitud = "";
        ArrayList<String> conceptos = new ArrayList<String>();
        ArrayList<Concept> Concepts = new ArrayList<Concept>(); 
        ArrayList<Order> orders = new ArrayList<Order>(); 
		for(int nrow=0;nrow<=rows;nrow++)
		{
			XSSFRow row=sheet.getRow(nrow);
            if (row == null) {
                // No entries in this row
                // Handle empty
                continue;
             }

            int orden = 0;
            String cedula = "";
            int total = 0;
			double FSP = 0;
            int IBC = 0;
            double pension = 0;
            double salud = 0;
            double arl = 0;


			String numOrder = "";
            String tpDocumment = "";
            int number = 0;
            String nomContributor = "";
            String post  = "";
            Date data = new Date();
            double salary = 0;
            int workedDays = 0;
            int daysDisabled = 0;
            int daysLicensed = 0;
            int totalDays = 0;
            Date admissionDates = new Date();
			
			for(int column=1;column<cols;column++)
			{
                String valor = "";
                XSSFCell cell=row.getCell(column, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
	
				switch(cell.getCellType())
				{
                //case STRING: System.out.print(cell.getStringCellValue()+"'"+nrow+"'"+column); break;
                //case NUMERIC: System.out.print(cell.getNumericCellValue()+"Number'"+nrow+"'"+column);break;
                case STRING: valor = cell.getStringCellValue(); break;
                case NUMERIC: valor = String.valueOf(cell.getNumericCellValue()); valor = valor.substring(0, valor.length() - 2); valor.replace(".","");  break;
                case BLANK: valor = "";
                //case BOOLEAN: System.out.print(cell.getBooleanCellValue()+"'"+nrow+"'"+column); break;
				}

                if (nrow == 3) {
                    
                    switch(column)
                    {
                        case 2: tipoDoc = valor; break;
                        case 3: numDoc = valor; break;
                        case 4: razon = valor; break;
                        case 9: referencia = valor; break;
                        case 10: solicitud = valor; break;
                    }
                } 

                
                
                if (nrow == 5) {
                            conceptos.add(valor);
                } 

                
                if (nrow > 5) {
                    switch(column) {
                        case 1: numOrder = valor; break;
                        case 2: tpDocumment = valor; break;
                        //case 3: number = Integer.parseInt(valor); break;
                        case 4: nomContributor = valor; break;
                        case 5: post = valor; break;
                        //case 8: salary = Double.parseDouble(valor);
                        //case 9: workedDays = Integer.parseInt(valor); break;
                        //case 10: daysDisabled = Integer.parseInt(valor); break;
                        //case 11: daysLicensed = Integer.parseInt(valor); break;
                        //case 12: totalDays = Integer.parseInt(valor); break;
                    }
                    if (column > 13 && column < 25 && cell.getCellType() == CellType.NUMERIC && valor != "") {
                        String titulo = "";
                        titulo = conceptos.get(column);
                        Double valor1 = Double.parseDouble(valor);
                        Concept concept = new Concept(titulo, valor1);
                        Concepts.add(concept);
                        conceptRepository.save(concept);
                        total = total + Integer.parseInt(valor);
                    }
                    if (column == 13 && column == 18 && column == 22 && column < 25 && cell.getCellType() == CellType.NUMERIC && valor != "") {
                        IBC = IBC + Integer.parseInt(valor);
                    }
                } 
			}
            switch (tipoDoc) {
                case "NI": pension = 4; salud = 4; break;
                case "CC": pension = 8.5; salud = 12; arl = 0.52; break;
                default : System.out.println("Falla"); 
            }

            IBC = total - IBC;
            FSP = total/SMMLV;
            pension = (IBC * pension)/100;
            salud = (IBC * salud)/100;
            arl = (IBC * arl)/100;

            if(isBetween(FSP,4,16)) {FSP= total/100;}
            if(isBetween(FSP,16,17)) {FSP= (total*1.2)/100;}
            if(isBetween(FSP,17,18)) {FSP= (total*1.4)/100;}
            if(isBetween(FSP,18,19)) {FSP= (total*1.6)/100;}
            if(isBetween(FSP,19,20)) {FSP= (total*1.8)/100;}
            if(FSP > 20) {FSP= (FSP*2)/100;}
            if (nrow > 5) {System.out.println("Cedula:"+cedula+", total ingresos:"+total+", FSP:"+FSP+", IBC:"+IBC+", pension:"+pension+", salud:"+salud+", arl:"+arl);}
            Order order = new Order(Concepts, numOrder, tpDocumment, number, nomContributor, post, data, salary, workedDays, daysDisabled, daysLicensed, totalDays, admissionDates);
            orders.add(order);
            orderRepository.save(order);
        }
        Documment document = new Documment(referencia, solicitud, orders);
        
        User user = userRepository.findById(userId).get();
        if (user != null) {
            if (user.getDocumments() == null) user.setDocumments(new ArrayList<>());
            user.getDocumments().add(docummentRepository.save(document));
            userRepository.save(user);
        }
        
        excel.close();
        //System.out.println("Tipo de documento:"+tipoDoc+", Numero Documento:"+numDoc+", Razon social:"+razon+", Referencia:"+referencia+", Solicitud:"+solicitud );
    }


    public static boolean isBetween(double fSP, int lower, int upper) {
        return lower <= fSP && fSP < upper;
      }


}

