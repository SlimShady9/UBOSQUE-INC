package co.unbosque.mondsinc.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import co.unbosque.mondsinc.models.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

}
