let appendCount = 0; // Initialize counter variable

const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    displayPost(posts);
}

const displayPost = posts => {
    const postContainer = document.getElementById('post-container');
    const readCountElement = document.getElementById('read-count');
    const readPostContainer = document.getElementById('read-post');

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList = `rounded-xl border-2 p-6 bg-gray-300 card mb-8`;
        postCard.innerHTML = `
            <div class="card-container flex text-center gap-8">
                <div class="image-div">
                    <div>
                        <img class="rounded-2xl w-16 h-16" src="${post.image}">
                    </div>
                    <div class="circle-div">
                        <i class="fa-solid fa-circle" id="circle-icon-${post.id}"></i>
                    </div>
                </div>
                <div>
                    <div class="flex gap-4">
                        <p># <span id="category">${post.category}</span></p>
                        <p>Author: <span id="author">${post.author.name}</span></p>
                    </div>
                    <h2 class="text-xl text-start font-extrabold text-heading py-4">${post.title}</h2>
                    <div> 
                        <p class="text-gray-600 text-start">${post.description}</p>
                    </div>
                    
                    <hr class="border-dashed pt-4 pb-4">
                    
                    <div class="flex justify-between">
                        <p>
                            <span class="pr-4"><i class="fa-regular fa-message pr-2"></i></i>${post.comment_count}</span>
                            <span class="pr-4"><i class="fa-solid fa-eye pr-2"></i>${post.view_count}</span>
                            <span><i class="fa-regular fa-clock pr-2"></i>${post.posted_time}</span>
                        </p>
                        <p>
                            <button class="btn btn-circle read-done-btn" data-title="${post.title}" data-view-count="${post.view_count}"><i class="fa-solid fa-envelope-circle-check text-green-500"></i></button>
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Append the postCard to the container
        postContainer.appendChild(postCard);

        // Get the circleIcon for this post
        var circleIcon = document.getElementById(`circle-icon-${post.id}`);
        var isActive = post.isActive;

        // Add class based on the value of isActive
        if (isActive) {
            circleIcon.classList.add("fa-circle-green");
        } else {
            circleIcon.classList.add("fa-circle-red");
        }
    });

    // Add event listener to "Mark as read" buttons
    const readDoneButtons = document.querySelectorAll('.read-done-btn');
    readDoneButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Increment appendCount
            appendCount++;
            // Update read count text content
            readCountElement.textContent = `(${appendCount})`;

            // Append HTML for the read post
            const title = button.getAttribute('data-title');
            const viewCount = button.getAttribute('data-view-count');
            const readPostHTML = `
                <div class="bg-white p-4 flex justify-between text-center rounded-xl mt-4">
                    <h2 class="text-xl font-extrabold text-heading py-4">${title}</h2>
                    <p><span class="pr-4"><i class="fa-solid fa-eye pr-2"></i>${viewCount}</span></p>
                </div>
            `;
            readPostContainer.insertAdjacentHTML('beforeend', readPostHTML);
        });
    });
}

loadPost();

// Latest Post Section

const LatestPost = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
        const data = await res.json();
        displayLatestPost(data);
    } catch (error) {
        console.error('Error fetching latest posts:', error);
    }
}

const displayLatestPost = (latestPosts) => {
    const container = document.getElementById('latest-post-container');

    latestPosts.forEach(post => {
      
        container.innerHTML += `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${post.cover_image}" alt="Cover Image" class="rounded-xl" />
                </figure>
                <div class="card-body">
                    <p><i class="fa-solid fa-calendar-days"></i><span class="ml-4">${post.author.posted_date || 'No Publish Date'}</i></span></p>
                    <h2 class="card-title">${post.title}</h2>
                    <p>${post.description}</p>
                    <div class="flex justify-self-start gap-4">
                        <div>
                            <img src="${post.profile_image}" alt="Author Image" class="w-11 h-11 rounded-full">
                        </div>
                        <div>
                            <p class="font-bold">${post.author.name}</p>
                            <p>${post.author.designation || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

LatestPost();