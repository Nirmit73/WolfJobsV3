// import { useEffect, useState } from "react";
// import { useApplicationStore } from "../../store/ApplicationStore";
// import { Button } from "@mui/material";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useSearchParams } from "react-router-dom";

// const JobGrading = (props: any) => {
//   const { jobData }: { jobData: Job } = props;

//   const [displayList, setDisplayList] = useState<Application[]>([]);
//   const [searchParams] = useSearchParams();

//   const applicationList = useApplicationStore((state) => state.applicationList);

//   useEffect(() => {
//     // let displayList: Application[] = [];s
//     setDisplayList(
//       applicationList.filter(
//         (item) => item.jobid === jobData._id && item.status === "grading"
//       )
//     );
//   }, [searchParams]);

//   const handleScoring = (applicationId: string, grade: string) => {
//     const url = "http://localhost:8000/api/v1/users/modifyApplication";

//     const body = {
//       applicationId: applicationId,
//       status: "rating",
//       rating: grade,
//     };

//     axios.post(url, body).then((res) => {
//       if (res.status == 200) {
//         toast.success("Rejected candidate");
//         location.reload();

//         return;
//       }
//       toast.error("Failed to reject candidate");
//     });
//   };

//   return (
//     <>
//       <div className="text-xl ">Grading</div>
//       {displayList.length === 0 && (
//         <div className="text-base text-gray-500">List empty</div>
//       )}
//       {displayList?.map((item: Application) => (
//         <div className=" p-1">
//           <div className="bg-white my-2 mx-1 p-2 rounded-lg">
//             <div className=" flex flex-col">
//               <div className="flex flex-col">
//                 <div> Name: {item.applicantname} </div>
//                 {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
//                 <div>Email: {item.applicantemail}</div>
//                 {!!item?.applicantSkills && (
//                   <div>Skills: {item.applicantSkills}</div>
//                 )}
//               </div>
//               <div className="text-xl mt-4">Grade the questions</div>
//               {jobData.questions.map((question, index) => (
//                 <div key={index}>
//                   <div className="text-base">{question}</div>
//                   <div className="text-base text-gray-600/80">
//                     {item.answers[index] || "No answer provided"}
//                   </div>
//                 </div>
//               ))}
//               {/* <div className="text-base">{jobData.question1}</div>
//               <div className="text-base text-gray-600/80">
//                 {item.answer1 || "empty"}
//               </div>
//               <div className="text-base">{jobData.question2}</div>
//               <div className="text-base text-gray-600/80">
//                 {item.answer2 || "empty"}
//               </div>
//               <div className="text-base">{jobData.question3}</div>
//               <div className="text-base text-gray-600/80 ">
//                 {item.answer3 || "empty"}
//               </div>
//               <div className="text-base">{jobData.question4}</div>
//               <div className="text-base text-gray-600/80">
//                 {item.answer4 || "empty"}
//               </div> */}
//               <div className="text-xl mt-4">Grade</div>
//               <div className="flex flex-row">
//                 <input
//                   className="border border-gray-700 rounded-lg w-20 text-right px-1"
//                   type="number"
//                   id={`${item._id}-grade`}
//                   max={10}
//                   min={0}
//                 />
//                 <div className="w-4" />
//                 <Button
//                   type="button"
//                   variant="outlined"
//                   onClick={() => {
//                     const x: any = document.getElementById(`${item._id}-grade`);
//                     const grade: string = x.value || "";
//                     handleScoring(item._id, grade.toString());
//                   }}
//                   style={{
//                     borderColor: "#FF5353",
//                     color: "#FF5353",
//                   }}
//                 >
//                   Grade
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default JobGrading;

import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const JobGrading = (props: any) => {
  const { jobData }: { jobData: Job } = props;

  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "grading"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  const handleScoring = (applicationId: string, grades: number[]) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "rating",
      grades: grades,
    };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Application graded successfully");
        location.reload();
        return;
      }
      toast.error("Failed to grade application");
    });
  };

  return (
    <>
      <div className="text-xl ">Grading</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div key={item._id} className="p-1">
          <div className="bg-white my-2 mx-1 p-2 rounded-lg">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
              <div className="text-xl mt-4">Grade the questions</div>
              {jobData.questions.map((question: string, index: number) => (
                <div key={index}>
                  <div className="text-base">{question}</div>
                  <div className="text-base text-gray-600/80">
                    {item.answers[index] || "No answer provided"}
                  </div>
                  <TextField
                    label={`Grade for Question ${index + 1}`}
                    type="number"
                    id={`${item._id}-grade-${index}`}
                    inputProps={{ min: 0, max: 10 }}
                    fullWidth
                    margin="dense"
                  />
                </div>
              ))}
              <div className="flex flex-row mt-4">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    const grades: number[] = jobData.questions.map(
                      (_: string, index: number) => {
                        const inputElement = document.getElementById(
                          `${item._id}-grade-${index}`
                        ) as HTMLInputElement;
                        return Number(inputElement.value) || 0;
                      }
                    );
                    handleScoring(item._id, grades);
                  }}
                  style={{
                    borderColor: "#FF5353",
                    color: "#FF5353",
                  }}
                >
                  Submit Grades
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobGrading;

