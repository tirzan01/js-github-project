
document.addEventListener('DOMContentLoaded', () => {
    
    
    document.getElementById('github-form').addEventListener('submit', e => {
        e.preventDefault()
        let userName = document.getElementById('search').value
        fetch(`https://api.github.com/search/users?q=${userName}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json'
            }
        })
            .then(resp => resp.json())
            .then(json => {

                while(document.getElementById('user-list').firstChild){
                    document.getElementById('user-list').firstChild.remove()
                }

                json.items.forEach(e => {
                    const li = document.createElement ('li')
                    li.innerHTML = `<span>${e.login} <a href=${e.html_url}>${e.html_url}</a></span>`     
                    document.getElementById('user-list').appendChild(li)   
                    li.addEventListener('click', elem => {
                        while(document.getElementById('repos-list').firstChild){
                            document.getElementById('repos-list').firstChild.remove()
                        } 

                        fetch(`https://api.github.com/users/${e.login}/repos`)
                            .then(resp => resp.json())
                            .then(json => {
                                json.forEach(item => {
                                    const repoLi = document.createElement('li')
                                    repoLi.innerHTML = `${item.name}`
                                    document.getElementById('repos-list').appendChild(repoLi)
                                })
                                
                        })
                })    
            })
        })
    })

})

