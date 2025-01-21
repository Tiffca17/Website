from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, TypeAdapter 
from typing import List, Annotated, Optional
from datetime import datetime, timedelta, date, time
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from starlette.requests import Request
from starlette.responses import JSONResponse
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import psycopg2
from psycopg2.extras import RealDictCursor
import json

conn = psycopg2.connect(
    database = "engineering",
    host = "localhost",
    user = "admin",
    password = "admin123",
    port = "5432"
)

# cursor = conn.cursor(cursor_factory=RealDictCursor)
cursor = conn.cursor()
# cursor.execute("SELECT * FROM test1")

app = FastAPI()

class EmailSchema(BaseModel):
   email: List[EmailStr]

class Activity(BaseModel):
    plant: str
    message: str
    code: str

conf = ConnectionConfig(
    MAIL_USERNAME="tiffanyca1710@gmail.com",  
    MAIL_PASSWORD="wnbe euil rwfb mdpl",  
    MAIL_SERVER="smtp.gmail.com", 
    MAIL_PORT=587,  
    MAIL_STARTTLS=True,  
    MAIL_SSL_TLS=False,  
    MAIL_FROM="tiffanyca1710@gmail.com",  
    # MAIL_DEBUG=1, 
    # SUPPRESS_SEND=0,  
    USE_CREDENTIALS=True,  
    # VALIDATE_CERTS=True  
)

# @app.post("/send_mail")
async def send_mail(email: EmailSchema, location:str, string: str):
    template = f"""
            <html>
            <body>
            
    
    <p>     <br> ALERT!!!
            <br> Issue at {location}
            <br>Message: {string}</p>
    
    
            </body>
            </html>
            """

    message = MessageSchema(
       subject="API EMAIL TESTING",
       recipients=email.get("email"),  # List of recipients, as many as you can pass  
       body=template,
       subtype="html"
       )

    fm = FastMail(conf)
    await fm.send_message(message)

    return JSONResponse(status_code=200, content={"message": "email has been sent"})

@app.post("/activity")
async def post_activity(activity:Activity):
    try:

        plant = activity.plant
        message = activity.message
        code = activity.code

        query = f"""INSERT INTO activity 
                        (plant, message, code)
                    VALUES
                        ('{plant}', '{message}', '{code}')
                    """
        
        cursor.execute(query)
        conn.commit()
        await send_mail({"email":["tiffanycampbell1710@gmail.com"]},plant, message)

        return "hi"
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()  # Rollback any failed transaction
        raise HTTPException(status_code=500, detail="Internal Server Error")
    