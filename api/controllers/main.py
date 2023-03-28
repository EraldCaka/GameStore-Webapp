from fastapi import FastAPI, Path, Query, HTTPException
from typing import Optional
from pydantic import BaseModel

# uvicorn working:app --reload -start server command

app = FastAPI()



class Company(BaseModel):
    name: str
    mission: str


class Employee(BaseModel):
    name: str
    role: str


class Farm(BaseModel):
    location: str
    area: str
    expected_outpup: str
    number_of_panels: int
    landscape: str
    orentation: str


class Panel(BaseModel):
    brand: str
    dimenstions: int
    material: str


companies = {}
employees = {}
farms = {}
panels = {}


# adding a company
@app.get("/get-company/{NUIS}")
def get_company(NUIS: int = Path(None, description="The ID of the view you wanted to view")):
    return companies[NUIS]


@app.post("/create-company/{NUIS}")
def create_company(NUIS: int, comp: Company):
    if NUIS in comp:
        raise HTTPException(status_code=202, detail="Company already exists")
    companies[NUIS] = comp
    return companies[NUIS]


@app.post("/create-employee/{NUIS}/{emp_id}")
def create_employee(NUIS: int, emp_id: int, emps: Employee):
    if companies[NUIS] is None:
        raise HTTPException(status_code=202, detail="Company doesn't exist")
    if emp_id in emps:
        raise HTTPException(status_code=202, detail="Employee already exists")

    employees[emp_id] = emps
    return employees[emp_id]


@app.get("/get-employee/{NUIS}/{emp_id}")
def get_employee(NUIS: int, emp_id: int = Path(None, description="The ID of the view you wanted to view")):
    return employees[emp_id]


@app.put("/update-employee/{NUIS}/{emp_id}")
def update_employee(NUIS: int, emp_id: int, emps: Employee):
    if emp_id not in employees:
        raise HTTPException(status_code=404, detail="Employee not found")
    employees[emp_id] = emps
    return employees[emp_id]


@app.put("/update-company/{NUIS}")
def update_employee(NUIS: int, comps: Company):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Employee not found")
    companies[NUIS] = comps
    return companies[NUIS]


@app.post("/create-farm/{NUIS}/{farm_id}")
def create_farm(NUIS: int, farm_id: int, farms1: Farm):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Company not found")
    if farm_id in farms:
        raise HTTPException(status_code=202, detail="Farm already exists")
    farms[farm_id] = farms1
    return farms[farm_id]


@app.get("/get-farm/{NUIS}/{farm_id}")
def check_farms(NUIS: int, farm_id: int = Path(None, description="The ID of the view you wanted to view")):
    if farm_id not in farms:
        raise HTTPException(status_code=404, detail="Farm not found!")
    return farms[farm_id]


@app.put("/update-farm/{NUIS}/{farm_id}")
def update_employee(NUIS: int, farm_id: int, farms1: Farm):
    if farm_id not in farms:
        raise HTTPException(status_code=404, detail="Farm not found")
    farms[farm_id] = farms1
    return farms[farm_id]


@app.post("/insert-panel/{NUIS}/{farm_id}/{panel_id}")
def insert_panel(NUIS: int, farm_id: int, panel_id: int, panel: Panel):
    if panel_id in panel:
        raise HTTPException(status_code=202, detail="Farm already exists")
    if companies[NUIS] is None:
        raise HTTPException(status_code=404, detail="Company doesn't exist")
    if farms[farm_id] is None:
        raise HTTPException(status_code=404, detail="Farm doesn't exist")
    panels[panel_id] = panel
    return panels[panel_id]


@app.get("/get-panel/{NUIS}/{farm_id}/{panel_id}")
def get_panel(NUIS: int, farm_id: int, panel_id: int = Path(None, description="The ID of the view you wanted to view")):
    return panels[panel_id]


@app.put("/update-panel/{NUIS}/{farm_id}/{panel_id}")
def update_panel(NUIS: int, farm_id: int, panel_id: int, panel: Panel):
    if panel_id not in panels:
        raise HTTPException(status_code=404, detail="Panel not found")
    panels[panel_id] = panel
    return panels[panel_id]


@app.delete("/delete-employee/{NUIS}/{emp_id}")
def delete_employee(NUIS: int, emp_id: int = Query(..., description="delete Employee")):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Company id not found.")
    if emp_id not in employees:
        raise HTTPException(status_code=404, detail="Employee not found.")
    del employees[emp_id]
    return {"Success": "Employee deleted!"}


@app.delete("/delete-company/{NUIS}")
def delete_company(NUIS: int = Query(..., description="Delete Company")):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Company not found.")

    del companies[NUIS]
    return {"Success": "Company deleted!"}


@app.delete("/delete-farms/{NUIS}/{farm_id}")
def delete_company(NUIS: int, farm_id: int = Query(..., description="Delete Farm")):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Company not found.")
    if farm_id not in farms:
        raise HTTPException(status_code=404, detail="Farms not found.")
    del farms[farm_id]
    return {"Success": "Farm deleted!"}


@app.delete("/delete-panel/{NUIS}/{farm_id}/{panel_id}")
def delete_company(NUIS: int, farm_id: int, panel_id: int = Query(..., description="Delete Farm")):
    if NUIS not in companies:
        raise HTTPException(status_code=404, detail="Company not found.")
    if farm_id not in farms:
        raise HTTPException(status_code=404, detail="Farms not found.")
    if panel_id not in panels:
        raise HTTPException(status_code=404, detail="Panels not found.")
    del panels[panel_id]
    return {"Success": "Panel deleted!"}


@app.get("/companies")
def get_all_companies():
    return companies


@app.get("/companies/employees/{NUID}")
def get_all_employees(NUID: int = Path(None, description="The ID of the view you wanted to view")):
    return employees

    
@app.get("/companies/farms/{NUID}")
def get_all_farms(NUID: int = Path(None, description="The ID of the view you wanted to view")):
    return farms


@app.get("/companies/farms/panels/{NUID}/{farm_id}")
def get_all_panels(NUID: int, farm_id: int = Path(None, description="All the panels")):
    return panels
# Task1 Completed by : Erald Caka
