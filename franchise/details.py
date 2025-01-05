from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol, StringCol

class StudentDetail(BaseDetail):
    s_id = ModelCol(display_as="Student ID")
    franchise = ModelCol(display_as="Franchisee")
    name = ModelCol(display_as="Name")
    photo = ModelCol(display_as="Photo")
    course = ModelCol(display_as="Course")
    programme = ModelCol(display_as="Programme")
    level = ModelCol(display_as="Level")
    dob = ModelCol(display_as="DOB")
    contact = ModelCol(display_as="Contact")
    sex = ModelCol(display_as="Sex")
    father_name = ModelCol(display_as="Father Name")
    father_occupation = ModelCol(display_as="Father Occupation")
    mother_name = ModelCol(display_as="Mother Name")
    mother_occupation = ModelCol(display_as="Mother Occupation")
    qualification = ModelCol(display_as="Qualification")
    reference_by = ModelCol(display_as="Referency By")
    residential_address = ModelCol(display_as="Residential Address")
    contact_number = ModelCol(display_as="Contact Number")
    email = ModelCol(display_as="Email")
    school_name = ModelCol(display_as="School Name")
    standard = ModelCol(display_as="Standard")
    num_siblings = ModelCol(display_as="Number Of Siblings")
    join_date = ModelCol(display_as="Join Date")
    course_start_date = ModelCol(display_as="Course Start Date")
    dropped = ModelCol(display_as="Dropped")

    class Meta:
        fields = [
            "s_id",
            "franchise",
            "name",
            "photo",
            "course",
            "programme",
            "level",
            "dob",
            "contact",
            "sex",
            "father_name",
            "father_occupation",
            "mother_name",
            "mother_occupation",
            "qualification",
            "reference_by",
            "residential_address",
            "contact_number",
            "email",
            "school_name",
            "standard",
            "num_siblings",
            "join_date",
            "course_start_date",
            "dropped",
        ]
    def get_title(self, obj, object_data):
        return f"{obj.name}"
    
    def photo_getval(self, obj):
        return f"<img src = {obj.photo.url}>"
    
    def franchise_getval(self, obj):
        return f"{obj.franchise.name}"
    
class LevelCertificateDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return f"Request for {obj.student.s_id} - {obj.student.name}'s {obj.course} level {obj.level} certificate "
    
class FranchiseDetail(BaseDetail):
    photo = ModelCol(display_as="Franchise Photo")
    name = ModelCol(display_as="Name")
    franchisee_type = ModelCol(display_as="Franchisee Type")
    locations = ModelCol(display_as="Locations")
    abacus = ModelCol(display_as="Abacus")
    vedic_maths = ModelCol(display_as="Vedic Maths")
    handwriting = ModelCol(display_as="handwriting")
    calligraphy = ModelCol(display_as="Calligraphy")
    robotics = ModelCol(display_as="Robotics")
    dob = ModelCol(display_as="DOB")
    blood_group = ModelCol(display_as="Blood Group")
    communication_address = ModelCol(display_as="Communication Address")
    city = ModelCol(display_as="City")
    state = ModelCol(display_as="State")
    contact_number = ModelCol(display_as="Contact Number")
    email = ModelCol(display_as="Email")
    educational_qualification = ModelCol(display_as="Education Qualification")
    present_occupation = ModelCol(display_as="Present Occupation")
    annual_income = ModelCol(display_as="Annual Income")
    experience_in_franchisee_model = ModelCol(display_as="Experience In Franchisee Model")
    find_about_us = ModelCol(display_as="How Did You Find Us")

    class Meta:
        fields = [
            "photo",
            "name",
            "franchisee_type",
            "locations",
            "abacus",
            "vedic_maths",
            "handwriting",
            "calligraphy",
            "robotics",
            "dob",
            "blood_group",
            "communication_address",
            "city",
            "state",
            "contact_number",
            "email",
            "educational_qualification",
            "present_occupation",
            "annual_income",
            "experience_in_franchisee_model",
            "find_about_us",
        ]

    def photo_getval(self, obj):
        return f"<img src = {obj.photo.url}>"
    
    def locations_getval(self, obj):
        location_html = """
        <table style='width: 100%; border-collapse: collapse;'>
            <thead>
                <tr>
                    <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>City</th>
                    <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Address</th>
                </tr>
            </thead>
            <tbody>
        """
        
        # Iterate through the locations list
        for loc in obj.get_locations():
            city = loc.get('city', 'N/A')  # Get the city or use 'N/A' if it's missing
            address = loc.get('address', 'N/A')  # Get the address or use 'N/A' if it's missing
            location_html += f"""
                <tr>
                    <td style='border: 1px solid #ddd; padding: 8px;'>{city}</td>
                    <td style='border: 1px solid #ddd; padding: 8px;'>{address}</td>
                </tr>
            """
        
        location_html += "</tbody></table>"
        return location_html



    def get_title(self, obj, object_data):
        """
        Return the title for the adverse event based on the patient's first and last name.

        Parameters:
            self: the instance of the class
            obj: the object containing patient information
            object_data: additional data related to the object

        Returns:
            str: the title for the adverse event
        """
        return f'Franchise: {obj.name}'
    


   