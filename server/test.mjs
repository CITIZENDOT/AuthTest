import { insertUser, getUserById } from "./controllers/User.js";

try {
  const response = await insertUser({
    firstName: "Appaji",
    lastName: "Chintimi",
    password: "123",
    userName: "CITIzENDOT",
  });
  console.log("[InsertionResponse] = ", response);
} catch (err) {
  console.log("[InsertionError] = ", err.code);
}

try {
  const response = await getUserById(9);
  console.log("[getUserByIdResponse] = ", response);
  console.log("userName = ", response.userName);
} catch (err) {
  console.log("[getUserByIdError] = ", err);
}
