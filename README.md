## Named Data object Notation specification

NDN (Named Data object Notation) is a data based binary format designed to carry large amounts 
of binary data with smaller amounts of additional data.

### Format
```
byte type
string name
[payload]
```

The `type` is a single byte defining the contents of the payload.  
The `name` is a descriptive name, and can be anything.

**The Data types and respective payloads are:**
```
Type: 0  Name: end
Payload: None.
Note:    This tag is used to mark the end of a array and object.

Type: 1  Name: boolean
Payload: A single signed byte (8 bits)

Type: 2  Name: int
Payload: A single signed byte (8 bits)

Type: 3  Name: float
Payload: A floating point value (32 bits, big endian, IEEE 754-2008, binary32)

Type: 4  Name: string
Payload: short length +
An array of bytes defining a string in UTF-8 format. The length of this array is <length> bytes

Type: 6 Name: array
Payload: An array of bytes

Type: 7 Name: null
Payload: ""

Type: 8 Name: object
Payload: An array of bytes with names

Type: 9 Name: undefined
Payload: ""
```

### Example

**Code:**
```
let obj1 = {
    bool: true, 
    test: 12, 
    super: 3.1415,
    hello: 'world', 
    arr: [4, 1, 2, 3],
    nullable: null,
    obj: {foo: 'bar'},
    und: undefined
};

let en1 = encode(obj1);
```

**Inside:**
```
Type_object(""):
{
    Type_boolean("bool"): 1
    Type_int("test"): 12
    Type_float("super"): 3.1415
    Type_string("hello"): world
    Type_array("arr"):
    {
        Type_int(0): 4
        Type_int(1): 1
        Type_int(2): 2
        Type_int(3): 3
    }
    Type_null("nullable"): ""
    Type_object("obj"):
    {
        Type_string("foo"): bar
    }
    Type_null("und"): ""
}
```
