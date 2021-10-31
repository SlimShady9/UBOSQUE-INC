package co.unbosque.mondsinc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@ComponentScan
public class MdbSpringBootApplication implements CommandLineRunner {

    @Autowired
    private ItemRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(MdbSpringBootApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        repository.deleteAll();

		// save a couple of customers
		repository.save(new GroceryItem("Caja", 4));
		repository.save(new GroceryItem("Martillo", 7));

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (GroceryItem customer : repository.findAll()) {
			System.out.println(customer);
		}
		System.out.println();

		// fetch an individual customer
		//System.out.println("Customer found with findByFirstName('Caja'):");
		//System.out.println("--------------------------------");
		//System.out.println(repository.findItemByName("Caja"));

        
    }

}