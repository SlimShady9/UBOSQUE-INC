package co.unbosque.mondsinc.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import co.unbosque.mondsinc.models.GroceryItem;


public interface ItemRepository extends MongoRepository<GroceryItem, String> {

    GroceryItem findItemByName(String name);
    
    public long count();
}
