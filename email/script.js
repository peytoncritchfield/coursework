const rawTxt = document.querySelector("textarea[name=txtarea]")
const finTxt = document.querySelector("textarea[name=output]")
const btn = document.querySelector("button")
const count = document.querySelector('.counter')
btn.addEventListener('click', function() {
    let temp = rawTxt.value
    let exp = /([a-z0-9-._]+@[a-z0-9-_.]+\.[a-z0-9-_.]+)/gi;
    let emailData = temp.match(exp)
    let holder = []
    for (let i = 0; i < emailData.length; i++) {
        if (holder.indexOf(emailData[i]) === -1) {
            holder.push(emailData[i])
        }
    }
    let finalText = holder.join(' ')
    finTxt.innerText = finalText
    count.innerText = `Number of Unique Emails: ${holder.length}`
})

finTxt.addEventListener('click', function() {
    this.select()
})