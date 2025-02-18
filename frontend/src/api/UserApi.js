import { openNotification } from "../util/NotificationRight"

export async function login(data) {
  const link = `http://localhost:8081/api/auth/login`
  try {
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseText = await response.text()

    if (response.ok) {
      try {
        const jsonData = JSON.parse(responseText)
        openNotification({
          type: "success",
          message: "Đăng nhập thành công!",
          description: "Đang chuyển trang...",
        })
        const token = jsonData.token
        localStorage.setItem("jwtToken", token)
        return jsonData
      } catch (error) {
        console.error("Response is not valid JSON:", responseText)
        throw new Error("Response is not valid JSON")
      }
    } else {
      console.error("Error:", responseText)
      openNotification({
        type: "error",
        message: "Đăng nhập thất bại!",
        description: responseText || "Có lỗi xảy ra, vui lòng thử lại.",
      })
    }
  } catch (error) {
    console.error("Error:", error.message)
    openNotification({
      type: "error",
      message: "Đăng nhập thất bại!",
      description: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
    })
  }
}

export async function register(data) {
  const link = "http://localhost:8081/api/auth/signup"
  try {
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseText = await response.text()

    if (response.ok) {
      try {
        openNotification({
          type: "success",
          message: "Đăng ký thành công!",
        })
      } catch (error) {
        console.error("Response is not valid JSON:", responseText)
        throw new Error("Response is not valid JSON")
      }
    } else {
      console.error("Error:", responseText)
      openNotification({
        type: "error",
        message: "Đăng ký thất bại!",
        description: responseText || "Có lỗi xảy ra, vui lòng thử lại.",
      })
    }
  } catch (error) {
    console.error("Error:", error.message)
    openNotification({
      type: "error",
      message: "Đăng ký thất bại!",
      description: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
    })
  }
}
