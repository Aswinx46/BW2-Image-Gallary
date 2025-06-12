import { SendOtpController } from "../../adapters/controllers/user/sendOtpController";
import { SignUpController } from "../../adapters/controllers/user/signUpController";
import { VerifyOtpController } from "../../adapters/controllers/user/verifyOtpController";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { SendOtpUseCase } from "../../useCases/user/sendOtpUseCase";
import { UserSignupUseCase } from "../../useCases/user/signupUseCase";
import { VerifyOtpUseCase } from "../../useCases/user/verifyOtpUseCase";
import { HashPassword } from "../bcrypt/hashPassword";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/otpService";


//--------------------------------------------user signup---------------------------------------
const EmailService = new emailService()
const otpService = new OtpService()
const hashPassword = new HashPassword()
const userRepository = new UserRepository()
const signUpUserUseCase = new UserSignupUseCase(userRepository, hashPassword)
export const injectedSignupController = new SignUpController(signUpUserUseCase)

//-------------------------------------------send otp user ------------------------------------
const sendOtpUseCase = new SendOtpUseCase(otpService, EmailService,userRepository)
export const injectedSendOtpController = new SendOtpController(sendOtpUseCase)

//-----------------------------------------verify otp user------------------
const verifyOtpUseCase = new VerifyOtpUseCase(otpService)
export const injectedVerifyOtpController = new VerifyOtpController(verifyOtpUseCase)