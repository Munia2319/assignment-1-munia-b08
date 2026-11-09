

function multiplyValue(value:number,multiplier?:number):number {
    
    if(multiplier != undefined){
        return value*multiplier;
    }

    return value*2;
}



function processInput(value:string | number |boolean): string | number {
    if (typeof value === "string") {
        return (value.trim()).toLowerCase();
    }

    if (typeof value === "number") {
        return value*10;
    } else {
       return value ? "Active":"Inactive";
    }
}





function formatCoordinate([latitude, longitude, locationName]:readonly[number,number,string] ): string {
    
    return `Location: ${locationName} (${latitude}, ${longitude})`;
}





function concatenateArrays <T>(...arrays:T[][]): T[] {
    return arrays.flat();
}





interface Course {
    title: string;
    students: number;
    isPublished: boolean;
}


function getPopularCourses(courses:Course[],minStudents:number):Course[] {
    
   const popularCourses: Course[] = [];
   courses.map((course)=>{
    if (course.isPublished == true && course.students>=minStudents) {
       
        popularCourses.push(course);
    }

    } );
    return popularCourses;
}



interface user{
    id:number;
    name:string;
    role:string;
}



function pluckValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
    return items.map((item) => item[key]);
}


class Employee {
    constructor(
        protected name :string,
        private baseSalary:number 
    ) {};

    getDetails():string{
        return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`
    }

}
class Manager extends Employee{
    constructor(name: string, baseSalary: number, private department: string){
        super(name, baseSalary)
    }

    getRoleInfo():string{
        return `Manager of ${this.department}: ${this.name}`;
    }
}





const validateAgeAsync = async(age:number):Promise<string> => {

    if (age<18){
        throw new Error("Access Denied: Must be 18 or older");
        
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "Access Granted";
    
} 

