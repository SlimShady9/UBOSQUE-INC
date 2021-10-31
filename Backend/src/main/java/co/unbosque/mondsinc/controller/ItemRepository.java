package co.unbosque.mondsinc.controller;


import org.springframework.data.mongodb.repository.MongoRepository;


public interface ItemRepository extends MongoRepository<GroceryItem, String> {

    GroceryItem findItemByName(String name);
    
    public long count();
}
