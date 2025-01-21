import re
import pandas as pd
import datetime
from fastapi import FastAPI, BackgroundTasks, File, Form, UploadFile, Request
# from fastapi_mail import FastMail, MessageSchema, MessageType
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from pydantic import EmailStr, BaseModel
from typing import List
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

def parse_iso_duration(duration):
    # Regular expression to extract the ISO 8601 duration components
    pattern = re.compile(
        r"P(?:(\d+)Y)?(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?"
    )
    match = pattern.match(duration)

    # Extract components or default to 0
    years = int(match.group(1)) if match.group(1) else 0
    # months = int(match.group(2)) if match.group(2) else 0
    days = int(match.group(2)) if match.group(2) else 0
    months = days//30
    hours = int(match.group(3)) if match.group(3) else 0
    minutes = int(match.group(4)) if match.group(4) else 0
    seconds = float(match.group(5)) if match.group(5) else 0

    # Convert to total seconds
    total_seconds = (
        years * 365 * 24 * 3600 +  # Assuming 1 year = 365 days
        # months * 30 * 24 * 3600 +  # Assuming 1 month = 30 days
        days * 24 * 3600 +
        hours * 3600 +
        minutes * 60 +
        seconds
    )

    # Dynamically determine the appropriate format
    if years > 0:
        if years == 1:
            return f"1 yr"
        return f"{years} yrs"
    elif months > 0:
        if months == 1:
            return f"1 mth"
        return f"{months} mths"
    elif days > 0:
        if days == 1:
            return f"1 day"
        return f"{days} days"
    elif hours > 0:
        if hours == 1:
            return f"1 hr"
        return f"{hours} hrs"
    elif minutes > 0:
        if minutes == 1:
            return f"1 min"
        return f"{minutes} mins"
    else:
        if seconds == 1:
            return f"1 sec"
        return f"{int(seconds)} sec"

# dt = pd.Timedelta("P1Y95DT19H13M6.694999S")

def iso_duration_to_str(timestring1, timestring2):
    str1 = timestring1
    str2 = timestring2

    date1,time1 = str1.split(" ")
    date2,time2 = str2.split(" ")


    year1, month1, day1 = date1.split("-")
    year2, month2, day2 = date2.split("-")

    hour1, minute1, second1 = time1.split(":")
    hour2, minute2, second2 = time2.split(":")

    # second1, millis = second1.split(".")
    second2, millis = second2.split(".")

    hour1 = int(hour1)
    minute1 = int(minute1)
    second1 = int(second1)

    hour2 = int(hour2)
    minute2 = int(minute2)
    second2 = int(second2)

    year1 = int(year1)
    month1 = int(month1)
    day1 = int(day1)

    year2 = int(year2)
    month2 = int(month2)
    day2 = int(day2)

    # test = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # print(hour1, minute1, second1)

    current_date = datetime.datetime(year1, month1, day1, hour1, minute1, second1)
    entry_date = datetime.datetime(year2, month2, day2, hour2, minute2, second2)
    difference = current_date - entry_date

    days = difference.days
    months = difference.days // 30
    years = months // 12
    remaining_months = months%12
    remaining_days = difference.days % 30

    remaining_seconds = difference.seconds
    hours = remaining_seconds // 3600
    remaining_seconds %= 3600
    minutes = remaining_seconds // 60

    if years == 0:
        if months == 0:
            if days == 0:
                if hours == 0:
                    if minutes == 0:
                        print(f"{remaining_seconds} sec{'s' if remaining_seconds > 1 else ''}")
                    else:
                        print(f"{minutes} min{'s' if minutes > 1 else ''}")
                else:
                    print(f"{hours} hr{'s' if hours > 1 else ''}")
            else:
                print(f"{days} day{'s' if days > 1 else ''}")
        else:
            if remaining_days == 0:
                print(f"{months} mth{'s' if months > 1 else ''}")
            else:
                print(f"{months} mth{'s' if months > 1 else ''} {remaining_days} day{'s' if remaining_days > 1 else ''}") 
    else:
        if remaining_months == 0:
            print(f"{years} yr{'s' if years > 1 else ''}")
        else:
            print(f"{years} yr{'s' if years > 1 else ''} {remaining_months} mth{'s' if remaining_months > 1 else ''}")

# test1 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# test2 = "2024-11-06 08:50:9.194"

# iso_duration_to_str(test1, test2)

# f = open("demofile2.txt", "a")
# f.write("Now the file has more content!")
# f.close()

# #open and read the file after the appending:
# f = open("demofile2.txt", "r")
# print(f.read())

class EmailSchema(BaseModel):
    email: List[EmailStr]

# app = FastAPI()

# Your FastMail configuration
conf = ConnectionConfig (
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
)

# async def debug_upload(request: Request):
#     form_data = await request.form()
#     return {"received_keys": list(form_data.keys())}


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins for now
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all methods
#     allow_headers=["*"],  # Allow all headers
# )


# @app.post("/send-mail")
# async def send_file(
#     # background_tasks: BackgroundTasks,
#     file: UploadFile = Form(...)
#     # email:EmailStr = Form(...)
#     )-> JSONResponse:

#     message = MessageSchema(
#             subject="Fastapi mail module",
#             recipients=["tiffanycampbell1710@gmail.com"],
#             body="Simple background task",
#             subtype="html",
#             attachments=[file])

#     fm = FastMail(conf)

#     await fm.send_message(message)

#     return JSONResponse(status_code=200, content={"message": "email has been sent"})

# @app.post("/send-mail")
# async def send_file():
#     # Open the file in binary mode
#     # with open('colours.txt', 'rb') as f:
#     #     file_data = f.read()

#     f = open("nigger.txt", "a")
#     f.write("Hi Nigger!")
#     f.close()

#     # Create the message
#     message = MessageSchema(
#         subject="Guys It Lowkey Do!",
#         recipients=["tiffanycampbell1710@gmail.com", "josiah.reece007@gmail.com", "mnathan812@gmail.com"],  # Email should be a string
#         body="It still gay but progress!",
#         subtype="html",
#         attachments=[{
#             'file': "client.py"  # File name to attach
#             # 'content': file_data,  # File content as binary data
#             # 'type': 'text/plain',  # MIME type of the file
#         }]
#     )

#     fm = FastMail(conf)
#     await fm.send_message(message)

#     return JSONResponse(status_code=200, content={"message": "email has been sent"})
# await send_mail_with_attachment("tiffanycampbell1710@gmail.com", "Sample Location", "This is a test message.")



# async def send_mail_with_attachment(
#     # background_tasks: BackgroundTasks,
#     email: EmailStr = Form(...),
#     location: str = Form(...),
#     message_str: str = Form(...)
# ) -> JSONResponse:
#     # Prepare the HTML email template with the provided location and message
#     template = f"""
#     <html>
#     <body style="background-color:blue">
#         <p>ALERT!!!</p>
#         <p>Issue at {location}</p>
#         <p>Message: {message_str}</p>
#     </body>
#     </html>
#     """

#     # Read the file (demofile2.txt) in binary mode
#     # file_path = "demofile2.txt"
#     # with open(file_path, "rb") as f:
#     #     file_data = f.read()

#     # Create the message with the file as an attachment
#     message = MessageSchema(
#         subject="API Email with Attachment",
#         recipients=[email],  # Send to the provided email
#         body=template,
#         subtype="HTML",
#         attachments=[{"filename": "demofile2.txt", "file": "colours.txt"}]  # Add the file as an attachment
#     )
#     fm = FastMail(conf)  # Initialize FastMail with your configuration
#     await fm.send_message(message)
#     print("success")
#     # Add the task to send the email asynchronously
#     # background_tasks.add_task(fm.send_message, message)

print(101//2)