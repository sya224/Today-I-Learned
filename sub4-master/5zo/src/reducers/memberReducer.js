import {
  FETCH_MEMBERS,
  GET_ALL_MEMBERS,
  GET_ALL_MEMBER_DATA,
  LOGIN,
  LOGIN_ERR,
  REGISTER_ERR,
  REGISTER,
  REGISTER_RESET,
  SET_LOGGED_INFO,
  GET_LOGGED_INFO,
  LOGOUT,
  EDIT_MYINFO,
  EDIT_MYINFO_ERR,
  GET_OTHER_MEMBER,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ERR,
  DELETE_ACCOUNT_SUCCESS,
  FIND_ID_FAIL,
  FIND_ID_FAIL_RESET,
  FIND_ID_SUCCESS,
  EXIST_EMAIL_SUCCESS,
  EXIST_EMAIL_FAIL,
  FIND_PW_SUCCESS,
  FIND_PW_FAIL,
  FIND_PW_FAIL_RESET,
  MATCH_ID_EMAIL_FAIL,
  MATCH_ID_EMAIL_SUCCESS,
  MATCH_ID_EMAIL_SUCCESS_RESET,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAIL,
  EDIT_PASSWORD_SUCCESS_RESET,
  EDIT_PASSWORD_FAIL_RESET,
  EDIT_MY_COLOR_FAIL,
  EDIT_MY_COLOR_FAIL_RESET,
  EDIT_MYPROFILE,
  CHECK_PASSWORD,
  CHECK_PASSWORD_RESET,
  EDIT_EMAIL,
  EDIT_EMAIL_RESET,
  EXIST_EMAIL_SUCCESS_RESET,
} from "../actions/types";
import _ from "lodash";
import { combineReducers } from "redux";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state, ..._.mapKeys(action.payload, "mem_id") };
    case GET_ALL_MEMBERS:
      return { ...state, members: action.payload };
    case GET_ALL_MEMBER_DATA:
      return { ...state, members: action.payload };
    case LOGIN:
      return { ...state, mem_info: action.payload };
    case LOGIN_ERR:
      return { ...state, login_err: action.payload };
    case REGISTER:
      return { ...state, register_id: action.payload };
    case REGISTER_ERR:
      return { ...state, register_err: action.payload };
    case REGISTER_RESET:
      return { ...state, register_err: "", register_id: "" };
    case SET_LOGGED_INFO:
      return { ...state, mem_info: action.payload, mem_info_change: undefined };
    case GET_LOGGED_INFO:
      return state;
    case LOGOUT:
      state = {};
      return combineReducers({ state: (state = {}) => state });
    case CHECK_PASSWORD:
      return { ...state, check_password: action.payload };
     case CHECK_PASSWORD_RESET:
      return { ...state, check_password: "" };
    case EDIT_EMAIL:
      return { ...state, edit_email: action.payload };
    case EDIT_EMAIL_RESET:
      return { ...state, edit_email: "" };
    case EDIT_MYPROFILE:
      return { ...state, mem_info_change: action.payload };
    // edit my info
    case EDIT_MYINFO:
      return { ...state, mem_info_change: action.payload };
    case EDIT_MYINFO_ERR:
      return { ...state, edit_myinfo_err: action.payload };
    // edit my color
    case EDIT_MY_COLOR_FAIL:
      return { ...state, mem_color_change_fail: "유저 색 변경 실패" };
    case EDIT_MY_COLOR_FAIL_RESET:
      return { ...state, mem_color_change_fail: undefined };
    // edit password
    case EDIT_PASSWORD_SUCCESS:
      return { ...state, edit_password_success: true };
    case EDIT_PASSWORD_SUCCESS_RESET:
      return { ...state, edit_password_success: undefined };
    case EDIT_PASSWORD_FAIL:
      return { ...state, edit_password_fail: action.payload };
    case EDIT_PASSWORD_FAIL_RESET:
      return { ...state, edit_password_fail: undefined };

    case GET_OTHER_MEMBER:
      return { ...state, other_mem_info: action.payload };

    case DELETE_ACCOUNT:
      state = {};
      return combineReducers({ state: (state = {}) => state });
    case DELETE_ACCOUNT_ERR:
      return { ...state, delete_account_err: action.payload };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, delete_account_success: true };

    // find ID
    case FIND_ID_FAIL:
      return { ...state, find_id_fail: "메일 API 오류" };
    case FIND_ID_FAIL_RESET:
      return { ...state, find_id_fail: undefined };
    case FIND_ID_SUCCESS:
      return { ...state, find_id_success: true };
    case EXIST_EMAIL_SUCCESS:
      return { ...state, exist_email_success: true }
    case EXIST_EMAIL_SUCCESS_RESET:
      return { ...state, exist_email_success: undefined }
    case EXIST_EMAIL_FAIL:
      return { ...state, find_id_fail: "해당 이메일의 유저가 존재하지 않습니다." }
    // find PW
    case FIND_PW_FAIL:
      return { ...state, find_pw_fail: "메일 API 오류" };
    case FIND_PW_FAIL_RESET:
      return { ...state, find_pw_fail: undefined };
    case FIND_PW_SUCCESS:
      return { ...state, find_pw_success: true };
    case MATCH_ID_EMAIL_SUCCESS:
      return { ...state, match_id_email_success: true }
    case MATCH_ID_EMAIL_SUCCESS_RESET:
      return { ...state, match_id_email_success: undefined }
    case MATCH_ID_EMAIL_FAIL:
      return { ...state, find_pw_fail: "입력한 아이디와 이메일 정보가 일치하지 않습니다." }
    default:
      return state;
  }
};
