# springbootcrud

The target of this project is to provide basic functionalities 
of creating, reading, updating, deleting, as well as 
(extra) searching, information of a Person entity or 
a Supplier entity. The tool is a Spring Boot application 
that accesses relational JPA data through a hypermedia-based RESTful front end.

Three main components are implemented to serve this purpose:
an API(Spring Boot App), a UI(vue) and a database(MYSQL).

Our two domain objects contain the following fields:

Person:
` isActive`,
` name`,
` email`,
` mobilePhone`,
` gender`,
` comments`.
 
Supplier: 
` companyName`,
` firstName`, ` lastName `, `vatNumber`, ` irsOffice`, ` address`,
` zipCode`, ` city`,
` country`. 

## API

To serve the crud + search functionality we use two repositories that
extend the JpaRepository. 

PersonRepository
```
@CrossOrigin(origins = "http://localhost:9000")
@RepositoryRestResource
public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findByEmail(String email);

    List<Person> findByIsActive(boolean isActive);

    @Query("SELECT p FROM Person p "
            + "WHERE p.email LIKE CONCAT('%',?1,'%') "
            + "     OR p.name LIKE CONCAT('%',?1,'%')")
    Page<Person> findByQuery(@Param("query") String query, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Person p "
            + "WHERE p.isActive = true "
            + "     AND p.email IS NOT NULL ")
    Long countActiveUsers();
}
```

SupplierRepository
```
@CrossOrigin(origins = "http://localhost:9000")
@RepositoryRestResource
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    @Query("SELECT s FROM Supplier s "
            + "WHERE s.companyName LIKE CONCAT('%',?1,'%') "
            + "     OR s.vatNumber LIKE CONCAT('%',?1,'%')")
    Page<Supplier> findByQuery(@Param("query") String query, Pageable pageable);
}
```

The PersonRepository implements a search method findByQuery querying
the database either by `name` or by `email`.

The SupplierRepository implements a search method findByQuery querying
the database either by `companyName` or by `vatNumber`. 

Endpoints

The base path for api endpoints is set in the `application.properties`
file as `/api`.
Unless configured otherwise in the @RepositoryRestResource, the endpoints 
for each entity is the entity's name in plural, e.g `/persons` or `/suppliers`.

Take, for example, a request to search for a supplier 
whose vat number may contain the string `123456789`.
This GET request will have the following format: 
`http://127.0.0.1:8080/api/suppliers/search/findByQuery?query=123456789`

## UI

The User Interface home page has a navigation bar at the left
where you can select to crud + search either for Persons or Suppliers.

+ By clicking one of the above, let's say Suppliers, a GET request 
will be sent to the API, and the response with all the suppliers
currently stored in the database will be displayed as list, each
supplier record as a row. You can click on any of the fields of 
the supplier to sort the results to your liking.

+ To create a new supplier, press the button 'Δημιουργία', fill in
the form inputs to provide information for every field. Notice, that some
fields with red asterisk will be mandatory, so they will be required
and validated not to be empty. Click save to store this supplier
in the database. This will send a POST request with a json payload
of all the fields values to the API.

+ By clicking on the edit button of a supplier a modal opens with
the supplier's fields form inputs. From there, you can update(PATCH) any 
information regarding the supplier or delete(DELETE).

+ Now if you want to search for a supplier either by its company name or vat number
all you have to do is fill in the search form and press the search button.
This will send a GET request with a Query String Parameter the String that you typed
in the form. The API will then respond to this request, and if the search has any match,
it will displayed again as a list. Otherwise, a No Data message lets the user know
that no supplier meets the search criteria. 

> Notice: the same request is sent when 
you click on suppliers option on the navigation section to see all suppliers, 
just with an empty String as query.

## Build Setup

``` bash
# navigate to client springboot-client directory
cd {path-to-project}/springbootcrud-client

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

`config/index.js`

Basic configuration needed for the UI (e.g host, port, etc.)

`src/main.js`

Libraries imports as well as axios baseURL and headers configuration.


