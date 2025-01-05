from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, TypeAdapter
from typing import List, Annotated, Optional
import models
from models import Faculty
from database import engine, SessionLocal, get_db
from sqlalchemy.orm import Session
from sqlalchemy import text
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
# faculty = cursor.fetchall() 
# print(faculty)

app = FastAPI()

class FacultyResponse(BaseModel):
    month_name: str
    month_number: Optional[int] 
    sum: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/relief-month-sum")
async def get_faculty():
    cursor.execute("WITH monthly_sums AS (SELECT TO_CHAR(DATE_TRUNC('month', time_stamp), 'Month') AS month_name, EXTRACT(MONTH FROM time_stamp) AS month_number, SUM(material_tonnes) AS sum FROM production WHERE plant LIKE '%Bush' AND date(time_stamp) >= '2025-01-01' AND date(time_stamp) <= '2025-12-31' GROUP BY month_name, month_number) SELECT * FROM monthly_sums ORDER BY month_number;")
    faculty = cursor.fetchall()
    response = [FacultyResponse(month_name=item[0], month_number=item[1], sum = item[2]) for item in faculty]
    return response

@app.get("/cv-month-sum")
async def get_faculty():
    cursor.execute("WITH monthly_sums AS (SELECT TO_CHAR(DATE_TRUNC('month', time_stamp), 'Month') AS month_name, EXTRACT(MONTH FROM time_stamp) AS month_number, SUM(material_tonnes) AS sum FROM production WHERE plant LIKE '%Valley' AND date(time_stamp) >= '2025-01-01' AND date(time_stamp) <= '2025-12-31' GROUP BY month_name, month_number) SELECT * FROM monthly_sums ORDER BY month_number;")
    faculty = cursor.fetchall()
    response = [FacultyResponse(month_name=item[0], month_number=item[1], sum = item[2]) for item in faculty]
    return response

@app.get("/bh-month-sum")
async def get_faculty():
    cursor.execute("WITH monthly_sums AS (SELECT TO_CHAR(DATE_TRUNC('month', time_stamp), 'Month') AS month_name, EXTRACT(MONTH FROM time_stamp) AS month_number, SUM(material_tonnes) AS sum FROM production WHERE plant LIKE '%Heath' AND date(time_stamp) >= '2025-01-01' AND date(time_stamp) <= '2025-12-31' GROUP BY month_name, month_number) SELECT * FROM monthly_sums ORDER BY month_number;")
    faculty = cursor.fetchall()
    response = [FacultyResponse(month_name=item[0], month_number=item[1], sum = item[2]) for item in faculty]
    return response

