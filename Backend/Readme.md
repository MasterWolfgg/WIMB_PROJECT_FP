# Where Is My Bus (WIMB)

A real-time bus tracking and management system built with Node.js, Express, MongoDB, and JWT authentication.  

## 🚀 Features
- Driver & Contractor authentication
- Bus & Route management
- Assignments linking driver -> bus -> route
- JWT-secured APIs
- (Incomplete) Real-time GPS tracking with Socket.IO

## 🛠 Tech Stack
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT
- Logging: Morgan
- Security: Helmet, CORS
- (Incomplete) Realtime: Socket.IO

## 📦 Installation
1. Clone this repository:
   ```bash
   git clone <repo-url>
   cd WIMB_PROJECT_FP/Backend

2. npm install

3. Create .env from .env.example and configure your values. 

4. Start the server using any of the following command

    npm run dev  
        OR
    npm start 

## 🌐 API Endpoints 
- POST /api/auth/driver/register → Register driver
- POST /api/auth/driver/login → Login driver
- POST /api/buses → Add new bus
- POST /api/routes → Add route
- POST /api/assignments → Assign driver to bus+route
- PATCH /api/assignments/:id/end → End assignment

## 🧪 Testing 
Use the Postman Collection provided in WIMB_PROJECT_FP/Backend/Wimb_Postman_Collection.json

## 🔑 HOw to Use Postman Json 
1. Open Postman -> Import -> select the file provided 
2. Use the requests in order: 
    - Register Driver 
    - Login Driver -> copy  JWT token -> paste into {{token}} varible
    - Create Bus
    - Create Route 
    - Create Assignment
    - End Assignment

## Entity Relationship Diagram 
1. The Entity-Relatioship Diagram for the system --> WIMB_PROJECT_FP/Documentation/Backend-Docs/ER-Diagram_For_WIMB-Backend.png

```mermaid
erDiagram
    USER {
        string userId PK
        string name
        string email
        string passwordHash
        string role
    }

    ADMIN {
        string adminId PK
        string userId FK
        string privileges
    }

    DRIVER {
        string driverId PK
        string userId FK
        string licenseNumber
        string phone
        string status
    }

    BUS {
        string busId PK
        string registrationNumber
        int capacity
        string model
        string status
    }

    ROUTE {
        string routeId PK
        string name
        string startLocation
        string endLocation
        float distance
        string estimatedTime
    }

    BUSSTOP {
        string stopId PK
        string routeId FK
        string name
        float latitude
        float longitude
        int sequenceOrder
    }

    ASSIGNMENT {
        string assignmentId PK
        string driverId FK
        string busId FK
        string routeId FK
        datetime startTime
        datetime endTime
        string status
    }

    LOCATIONUPDATE {
        string updateId PK
        string assignmentId FK
        datetime timestamp
        float latitude
        float longitude
        float speed
    }

    USER ||--o{ ADMIN : "is"
    USER ||--o{ DRIVER : "is"
    DRIVER ||--o{ ASSIGNMENT : "assigned"
    BUS ||--o{ ASSIGNMENT : "assigned"
    ROUTE ||--o{ ASSIGNMENT : "assigned"
    ROUTE ||--o{ BUSSTOP : "has"
    ASSIGNMENT ||--o{ LOCATIONUPDATE : "generates"
```



## Data Flow Diagrams 
1. Level 0 (Simple) - Simple BAckend System DataFlow --> WIMB_PROJECT_FP/Documentation/Backend-Docs/Level-0-DFD-WIMB-Backend.png

```mermaid
flowchart TD
    Admin([Admin]) -->|Manage data| System[(Bus Tracking System)]
    Driver([Driver]) -->|Send GPS location| System
    Student([Student/User]) -->|View bus location| System

    System -->|Store & Retrieve| DB[(Database)]
    System -->|Provide updates| Student
```



   
2. Level 1 (detailed) - Backend System DataFlow in Detail --> WIMB_PROJECT_FP/Documentation/Backend-Docs/Level-1-DFD-Detailed-WIMB-Backend.png

```mermaid
flowchart TD
    subgraph System[Bus Tracking System]
        A1[Authentication & Authorization]
        A2[Bus & Route Management]
        A3[Driver Assignment]
        A4[Real-time Location Tracking]
        A5[User Interface]
    end

    Admin([Admin]) -->|Login / Manage| A1
    Driver([Driver]) -->|Login| A1
    Student([Student/User]) -->|Login / Access| A1

    A1 -->|Validate| D1[(User Data)]

    Admin -->|Create/Update buses & routes| A2
    A2 --> D2[(Bus Data)]
    A2 --> D3[(Route Data)]

    Admin -->|Assign driver-bus-route| A3
    A3 --> D4[(Assignment Data)]

    Driver -->|Send GPS| A4
    A4 --> D5[(Location Logs)]
    A4 -->|Broadcast live location| A5
    A5 --> Student

    A5 -->|Fetch data| D2
    A5 -->|Fetch data| D3
    A5 -->|Fetch data| D5
```

   
