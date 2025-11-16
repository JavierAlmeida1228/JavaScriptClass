/*
    Load posts from localStorage if they exist
*/
if (localStorage.getItem("posts")) {
  const posts = JSON.parse(localStorage.getItem("posts"));
  posts.forEach(value => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = value;
    document.querySelector("#output").appendChild(wrapper.firstChild);
  });
}

/*
    Add button: create a new post with a checkbox, timestamp, and text
*/
document.querySelector("#addBtn").addEventListener("click", () => {
  const textarea = document.querySelector("#postInput");
  if (!textarea.value.trim()) return;

  const post = document.createElement("div");
  post.className = "post";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("hidden");

  const time = document.createElement("time");
  time.innerHTML = new Date().toLocaleTimeString();

  const p = document.createElement("p");
  p.innerHTML = textarea.value;

  post.appendChild(check);
  post.appendChild(time);
  post.appendChild(p);

  document.querySelector("#output").appendChild(post);
  textarea.value = "";

  savePosts();
});

/*
    Save posts to localStorage
*/
function savePosts() {
  const posts = Array.from(document.querySelectorAll(".post")).map(post => post.outerHTML);
  localStorage.setItem("posts", JSON.stringify(posts));
}

/*
    Bulk Delete button: toggle checkboxes + Select All + Confirm
*/
document.querySelector("#bulkDeleteBtn").addEventListener("click", () => {
  document.querySelectorAll(".post input[type='checkbox']").forEach(cb => cb.classList.toggle("hidden"));
  document.querySelector("#selectAllBtn").classList.toggle("hidden");
  document.querySelector("#confirmBtn").classList.toggle("hidden");
});

/*
    Select All button: check all boxes
*/
document.querySelector("#selectAllBtn").addEventListener("click", () => {
  document.querySelectorAll(".post input[type='checkbox']").forEach(cb => cb.checked = true);
});

/*
    Confirm button: delete checked posts and update localStorage
*/
document.querySelector("#confirmBtn").addEventListener("click", () => {
  document.querySelectorAll(".post").forEach(post => {
    const cb = post.querySelector("input[type='checkbox']");
    if (cb && cb.checked) post.remove();
  });
  savePosts();
});










