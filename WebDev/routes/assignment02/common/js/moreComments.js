userComments = {
  user_2342: {
    name: "dio",
    time: "2014-03-28",
    comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ad tenetur magni corrupti officia vel, quisquam unde laboriosam.
    `
  },
  user_12342: {
    name: "sedric22",
    time: "2014-06-13",
    comment: `Quasi quae unde corporis, aperiam excepturi eligendi nostrum! Voluptatem, iure distinctio! Sed est beatae, laudantium ab iusto voluptatem magnam itaque vero sunt? Exercitationem, unde.
    `
  },
  user_23342: {
    name: "captain_achairica_1233",
    time: "2014-06-20",
    comment: `Corrupti dicta, quo unde quia, eos consequatur voluptatem quaerat expedita id ipsam cum reprehenderit! Corrupti, eius doloremque?`
  },
  user_23542: {
    name: "steve",
    time: "2014-07-12",
    comment: `Nice!`
  }
}

function loadMoreComments() {
  commentSection = document.getElementById('comment-section');

  for (listed in userComments) {
    const aside = document.createElement('aside');
    const timeEl = document.createElement('time');
    const footer = document.createElement('footer');
    const comment = document.createElement('p');

    const user = userComments[listed];

    // handle time element creation
    const timeArray = user.time.split('-');
    const monthObj = {
      "03": "March",
      "06": "June",
      "07": "July",
    }
    timeEl.dateTime = user.time;
    timeEl.innerHTML = `${monthObj[timeArray[1]]} ${timeArray[2]}, ${timeArray[0]}`

    // handle footer element creation
    footer.innerHTML = `${user.name} wrote on `
    footer.appendChild(timeEl)
    footer.innerHTML += ':'

    // handle comment element, <p> tag:
    comment.innerText = `${user.comment}`
    comment.classList.add('deep-margin')

    // finalize aside
    aside.appendChild(footer)
    aside.appendChild(comment)
    aside.classList.add("comment-container")

    // add comment to comment section
    commentSection.appendChild(aside)
  }

  // remove element from comment-section, was causing conflicts with createElement() and new comment styling
  document.getElementById('comments-button').outerHTML = ""
}
