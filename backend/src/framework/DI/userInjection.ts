
import { ChangePasswordController } from "../../adapters/controllers/user/authentication/changePasswordController";
import { RefreshTokenController } from "../../adapters/controllers/user/authentication/refreshTokenController";
import { SendOtpController } from "../../adapters/controllers/user/authentication/sendOtpController";
import { SignUpController } from "../../adapters/controllers/user/authentication/signUpController";
import { UserLoginController } from "../../adapters/controllers/user/authentication/userLoginController";
import { UserLogoutController } from "../../adapters/controllers/user/authentication/userLogoutController";
import { VerifyOtpController } from "../../adapters/controllers/user/authentication/verifyOtpController";
import { DeleteImageController } from "../../adapters/controllers/user/imageUploading/deleteImageController";
import { FindImagesOfUserController } from "../../adapters/controllers/user/imageUploading/findImagesOfUserController";
import { ImageUploadingController } from "../../adapters/controllers/user/imageUploading/imageUploadingController";
import { UpdateImageController } from "../../adapters/controllers/user/imageUploading/updateImageController";
import { UpdateImageOrderController } from "../../adapters/controllers/user/imageUploading/updateImageOrderController";
import { UpdateTitleController } from "../../adapters/controllers/user/imageUploading/updateTitleController";
import { tokenValidationMiddleware } from "../../adapters/middlewares/refreshTokenCheckerMiddleware";
import { ImageRepository } from "../../adapters/repository/imageRepository/imageRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { ChangePasswordUseCase } from "../../useCases/user/authentication/changePasswordUseCase";
import { SendOtpUseCase } from "../../useCases/user/authentication/sendOtpUseCase";
import { UserSignupUseCase } from "../../useCases/user/authentication/signupUseCase";
import { UserLoginUseCase } from "../../useCases/user/authentication/userLoginUseCase";
import { UserLogoutUseCase } from "../../useCases/user/authentication/userLogoutUseCase";
import { VerifyOtpUseCase } from "../../useCases/user/authentication/verifyOtpUseCase";
import { DeleteImageUseCase } from "../../useCases/user/imageUploading/deleteImageUseCase";
import { FindImagesOfUserUseCase } from "../../useCases/user/imageUploading/findImagesOfUserUseCase";
import { ImageUploadingUseCase } from "../../useCases/user/imageUploading/imageUploadingUseCase";
import { UpdateImageOrderUseCase } from "../../useCases/user/imageUploading/updateImageOrder";
import { UpdateImageUseCase } from "../../useCases/user/imageUploading/updateImageUseCase";
import { updateTitleUseCase } from "../../useCases/user/imageUploading/updateTitleUseCase";

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

//-------------------------------------refresh token ------------------------
export const injectedRefreshTokenController = new RefreshTokenController(jwtService)


//-------------------------------Middleware injection-------------------
export const InjectedtokenValidationMiddleware = tokenValidationMiddleware(jwtService)

//---------------------------------updating title -------------------
const UpdatetitleUseCase = new updateTitleUseCase(imageDatabase)
export const injectedUpdateTiteController = new UpdateTitleController(UpdatetitleUseCase)

//----------------------------------update image------------------
const updateImageUseCase = new UpdateImageUseCase(imageDatabase)
export const injectedUpdateImageController = new UpdateImageController(updateImageUseCase)

//----------------------------------update image order ----------------------------
const updateImageOrderUseCase = new UpdateImageOrderUseCase(imageDatabase)
export const injectedUpdateImageOrderControlller = new UpdateImageOrderController(updateImageOrderUseCase)

//------------------------------------delete image------------------------
const deleteImageUseCase = new DeleteImageUseCase(imageDatabase)
export const injectedDeleteImageController = new DeleteImageController(deleteImageUseCase)

//---------------------------------------user logout--------------------------------
const userLogoutUseCase = new UserLogoutUseCase(userRepository, jwtService)
export const injectedUserLogoutController = new UserLogoutController(userLogoutUseCase)

//---------------------------------------------user password changed ------------------------
const changePasswordUseCase = new ChangePasswordUseCase(userRepository, hashPassword)
export const injectedChangePasswordController = new ChangePasswordController(changePasswordUseCase)