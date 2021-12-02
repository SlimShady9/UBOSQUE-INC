package co.unbosque.mondsinc.controller;

import java.io.IOException;
import java.io.InputStream;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
    
    ArrayList<Order> orders = new ArrayList<Order>(); 
    ArrayList<Concept> Concepts = new ArrayList<Concept>(); 
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
        Concepts.clear();
        
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
            int month = 0;
            int year = 0;
            double salary = 0;
            int workedDays = 0;
            int daysDisabled = 0;
            int daysLicensed = 0;
            int totalDays = 0;
            Date admissionDates = new Date();
			
			for(int column=0;column<cols;column++)
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
                        case 1: tipoDoc = valor; break;
                        case 2: numDoc = valor; break;
                        case 3: razon = valor; break;
                        case 8: referencia = valor; break;
                        case 9: solicitud = valor; break;
                    }
                    switch (tipoDoc) {
                        case "NI": pension = 4; salud = 4; break;
                        case "CC": pension = 8.5; salud = 12; arl = 0.52; break;
                        default : System.out.println("Falla"); 
                    }
                }                 
                
                if (nrow == 5) {
                    conceptos.add(valor);
                } 

                
                if (nrow > 5) {
                    switch(column) {
                        case 0: numOrder = valor; break;
                        case 1: tpDocumment = valor; break;
                        case 2: if (valor == "") {valor = "0";} number = Integer.parseInt(valor); break;
                        case 3: nomContributor = valor; break;
                        case 4: post = valor; break;
                        case 5: if (valor == "") {valor = "0";} year = Integer.parseInt(valor); break;
                        case 6: if (valor == "") {valor = "0";} month = Integer.parseInt(valor); break;
                        case 7: if (valor == "") {valor = "0";} salary = Double.parseDouble(valor);
                        case 8: if (valor == "") {valor = "0";} workedDays = Integer.parseInt(valor); break;
                        case 9: if (valor == "") {valor = "0";} daysDisabled = Integer.parseInt(valor); break;
                        case 10: if (valor == "") {valor = "0";} daysLicensed = Integer.parseInt(valor); break;
                        case 11: if (valor == "") {valor = "0";} totalDays = Integer.parseInt(valor); break;
                    }
                    if (column > 13 && column < 25 && cell.getCellType() == CellType.NUMERIC && valor != "") {
                        String titulo = "";
                        titulo = conceptos.get(column-1);
                        if (valor != "0" && valor != "") {
                            Double valor1 = Double.parseDouble(valor);
                            Concept concept = new Concept(titulo, valor1);
                            Concepts.add(concept);
                            conceptRepository.save(concept);
                            total = total + Integer.parseInt(valor);
                        }
                    }
                    if (column == 13 && column == 18 && column == 22 && column < 25 && cell.getCellType() == CellType.NUMERIC && valor != "") {
                        IBC = IBC + Integer.parseInt(valor);
                    }
                } 
			}


            IBC = total - IBC;
            FSP = total/SMMLV;
            salud = (IBC * salud)/100;
            pension = (IBC * pension)/100;
            arl = (IBC * arl)/100;

            if(isBetween(FSP,4,16)) {FSP= total/100;}
            if(isBetween(FSP,16,17)) {FSP= (total*1.2)/100;}
            if(isBetween(FSP,17,18)) {FSP= (total*1.4)/100;}
            if(isBetween(FSP,18,19)) {FSP= (total*1.6)/100;}
            if(isBetween(FSP,19,20)) {FSP= (total*1.8)/100;}
            if(FSP > 20) {FSP= (FSP*2)/100;}
            if (nrow > 5 && numOrder != null ) {
                System.out.println(IBC+"as");
                leerPila(excel, Concepts, numOrder, tpDocumment, number, nomContributor, post, month, year, salary, workedDays, daysDisabled, daysLicensed, totalDays, admissionDates, IBC, salud, pension, arl);
            }
        }
        
       

        Documment document = new Documment(referencia, solicitud, orders, new Date(System.currentTimeMillis()));
        
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



    public void leerPila(XSSFWorkbook excel, List<Concept> concepts, String numOrder, String tpDocumment, int number, String nomContributor, String post,
    int month, int year, double salary, int workedDays, int daysDisabled, int daysLicensed, int totalDays, Date admissionDates, double IBC, double salud, double pension, double arl) {
    XSSFSheet pila = excel.getSheetAt(1);

    int prows=pila.getLastRowNum();
    int pcols=pila.getRow(1).getLastCellNum();
    String ptpDocumment = "";
    int pnumber = 0;
    String pnomContributor = "";
    String ppost  = "";
    int pmonth = 0;
    int pyear = 0;
    double pagoSalud = 0;
    double pagoPension = 0;
    double pagoArl = 0;

    double difSalud = 0;
    double difPension = 0;
    double difArl = 0;
    String estadoSalud = "";
    String estadoPension = "";
    String estadoArl = "";
    for(int nrow=1;nrow<=prows;nrow++)
    {
        XSSFRow prow=pila.getRow(nrow);


        for(int column=1;column<pcols;column++)
        {
            String valor = "";
            XSSFCell cell=prow.getCell(column, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);

            switch(cell.getCellType())
            {
            //case STRING: System.out.print(cell.getStringCellValue()+"'"+nrow+"'"+column); break;
            //case NUMERIC: System.out.print(cell.getNumericCellValue()+"Number'"+nrow+"'"+column);break;
            case STRING: valor = cell.getStringCellValue(); break;
            case NUMERIC: valor = String.valueOf(cell.getNumericCellValue()); valor = valor.substring(0, valor.length() - 2); valor.replace(".","");  break;
            case BLANK: valor = "";
            //case BOOLEAN: System.out.print(cell.getBooleanCellValue()+"'"+nrow+"'"+column); break;
            }

            if (nrow > 5) {
                switch(column) {
                    case 1: ptpDocumment = valor; break;
                    case 2: if (valor == "") {valor = "0";} pnumber = Integer.parseInt(valor); break;
                    case 3: pnomContributor = valor; break;
                    case 4: if (valor == "") {valor = "0";} pyear = Integer.parseInt(valor); break;
                    case 5: if (valor == "") {valor = "0";} pmonth = Integer.parseInt(valor); break;
                    case 10: if (valor == "") {valor = "0";} pagoSalud = Double.parseDouble(valor);
                    case 15: if (valor == "") {valor = "0";} pagoPension = Double.parseDouble(valor); break;
                    case 20: if (valor == "") {valor = "0";} pagoArl = Double.parseDouble(valor); break;
                }
            }

            if (ptpDocumment == tpDocumment && pnumber == number && (pyear == year && pmonth == month)) {
                difSalud = pagoSalud - salud;
                if (pagoSalud == 0) {
                    estadoSalud = "OMISO";
                } else if (difSalud != 0) {
                    estadoSalud = "INEXACTO";
                }
                difPension = pagoPension - pension;
                if (pagoPension == 0) {
                    estadoPension = "OMISO";
                } else if (difPension != 0) {
                    estadoPension = "INEXACTO";
                }
                difArl = pagoArl -arl;
                if (pagoArl == 0) {
                    estadoArl = "OMISO";
                } else if (difSalud != 0) {
                    estadoArl = "INEXACTO";
                }
            }

        }
    }
    if (numOrder != "" && number != 0) {
        System.out.println(IBC);
        Order order = new Order(Concepts, numOrder, tpDocumment, number, nomContributor, post, month, year, salary, workedDays, daysDisabled, daysLicensed, totalDays,
        admissionDates, IBC, pagoSalud, difSalud, estadoSalud, pagoPension, difPension, estadoPension, pagoArl, difArl, estadoArl);
        orders.add(order);
        orderRepository.save(order);
    }
    }
}

