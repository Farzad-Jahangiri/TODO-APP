const toast = document.getElementById("toast")
function fetchData(title, caption, date) {
  try {
    $.ajax({
      url: 'http://127.0.0.1:8000/members/insert',
      type: 'POST',
      data: {
        'title': title,
        'caption': caption,
        'date': date,
      },
      success: function(response) {
        return 1;
      },
      error: function(error) {
        return 0;
      }
    });
  } catch (error) {
    console.log("خطا در دریافت داده ها:", error);
  }
}


document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // جلوگیری از ارسال فرم به صفحه دیگر

  let title = document.getElementById("title");
  let date = document.getElementById("date");
  let description = document.getElementById("description");
  if (!title.value) {
    title.classList.toggle("border-no-value");
    return
  }
  if (!date.value) {
    date.classList.toggle("border-no-value");
    return
  }
  fetchData(title.value, description.value , date.value);
  title.value="";
  date.value="";
  description.value="";
  toast.style.opacity=1;
  setTimeout(() => {
    toast.style.opacity=0;
  }, 3000);

});
