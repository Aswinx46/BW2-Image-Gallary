
import { SendOtpController } from "../../adapters/controllers/user/authentication/sendOtpController";
import { SignUpController } from "../../adapters/controllers/user/authentication/signUpController";
import { UserLoginController } from "../../adapters/controllers/user/authentication/userLoginController";
import { VerifyOtpController } from "../../adapters/controllers/user/authentication/verifyOtpController";
import { FindImagesOfUserController } from "../../adapters/controllers/user/imageUploading/findImagesOfUserController";
import { ImageUploadingController } from "../../adapters/controllers/user/imageUploading/imageUploadingController";
import { ImageRepository } from "../../adapters/repository/imageRepository/imageRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { SendOtpUseCase } from "../../useCases/user/authentication/sendOtpUseCase";
import { UserSignupUseCase } from "../../useCases/user/authentication/signupUseCase";
import { UserLoginUseCase } from "../../useCases/user/authentication/userLoginUseCase";
import { VerifyOtpUseCase } from "../../useCases/user/authentication/verifyOtpUseCase";
import { FindImagesOfUserUseCase } from "../../useCases/user/imageUploading/findImagesOfUserUseCase";
import { ImageUploadingUseCase } from "../../useCases/user/imageUploading/imageUploadingUseCase";

import { HashPassword } from "../bcrypt/hashPassword";
import { emailService } from "../services/emailService";
import { JwtService } from "../services/jwtService";
import { OtpService } from "../services/otpService";


//--------------------------------------------user signup---------------------------------------
const EmailService = new emailService()
const otpService = new OtpService()
const hashPassword = new HashPassword()
const userRepository = new UserRepository()
const signUpUserUseCase = new UserSignupUseCase(userRepository, hashPassword)
export const injectedSignupController = new SignUpController(signUpUserUseCase)

//-------------------------------------------send otp user ------------------------------------
const sendOtpUseCase = new SendOtpUseCase(otpService, EmailService, userRepository)
export const injectedSendOtpController = new SendOtpController(sendOtpUseCase)

//-----------------------------------------verify otp user------------------
const verifyOtpUseCase = new VerifyOtpUseCase(otpService)
export const injectedVerifyOtpController = new VerifyOtpController(verifyOtpUseCase)

//-------------------------------------------user Login-----------------------
const jwtService = new JwtService()
const userLoginUseCase = new UserLoginUseCase(userRepository, hashPassword)
export const injectedUserLoginController = new UserLoginController(userLoginUseCase, jwtService)

//------------------------------------------Image upload--------------------
const imageDatabase = new ImageRepository()
const imageUpload = new ImageUploadingUseCase(imageDatabase)
export const injectedImageUploadController = new ImageUploadingController(imageUpload)

//----------------------------------------find images -------------------------------
const findImagesUseCase = new FindImagesOfUserUseCase(imageDatabase)
export const injectedFindImagesController = new FindImagesOfUserController(findImagesUseCase)