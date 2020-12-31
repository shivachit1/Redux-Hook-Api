describe('Blog app', () => {

  beforeEach(function() {
    // POST request to reset all data from test server
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    // creating new user with user details
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    // checking if DOM contains LoginForm with .loginForm className
    cy.get('.loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    // handling login with correct credentials
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      // handling login with incorrect credentials
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('wrong')
      cy.contains('login').click()

      // testing if Notifcation component has error message
      cy.contains('wrong credentials')

      // testing if DOM doesnt have User logged in for final test
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', () => {

    beforeEach(function() {
    // logging user with username and password before test starts
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', () => {
      // test after successful login
      cy.contains('Matti Luukkainen logged in')
      cy.contains('Create New Blog').click()

      // creating new blog
      cy.get('input[name="title').type('how to do cypress E2E testing.')
      cy.get('input[name="author').type('cypress')
      cy.get('input[name="url').type('www.cypress.com')
      cy.contains('create').click()

      // testing new blog title if exists in DOM
      cy.contains('how to do cypress E2E testing.')
    })

    describe('and a blog exists', () => {
      beforeEach(function () {
        // creating sample blog for updating likes
        cy.createBlog({
          title: 'how to do cypress testing1.',
          author: 'cypress',
          url:'www.cypress.com'
        })

      })

      it('blog can be liked', function () {
        // displaying blog details
        cy.contains('how to do cypress testing1.').click()
        // getting buttton with className .likeButton and assigning button as likeButton
        cy.contains('like').parent().find('.likeButton').as('likeButton')
        cy.get('@likeButton').should('contain', 'like').click()

      })

      it('blog can be deleted by user who created it ', function () {
        // displaying blog details
        // delete button is only visible if the blog is created by user
         cy.contains('how to do cypress testing1.').click()
        
         // getting buttton with className .deleteButton and assigning button as deleteButton
        cy.contains('delete').parent().find('.deleteButton').as('deleteButton')
        cy.get('@deleteButton').should('contain', 'delete').click()

        // testing if blog is successfully deleted and doesnt exists in DOM
        cy.contains('how to do cypress E2E testing1.').should('not.exist')

        // testing if successful message is shown in Notification component
        cy.contains('blog is deleted')
        
      })

    })

    describe('deleting blog of other user', function() {
      beforeEach(function() {

        // creating new blog by loggedUser Matti Luukkainen
        cy.createBlog({
          title: 'how to do cypress testing2.',
          author: 'cypress',
          url:'www.cypress.com'
        })

        // Matti Luukkainen logging out
        cy.logout()

        // creating new user
        const user = {
          name: 'Tester Testing',
          username: 'test1',
          password: 'testerPassword'
        }
        // creating new user in the database with post request
        cy.request('POST', 'http://localhost:3001/api/users/', user)

        // logging in new user with credentials
        cy.login({ username: 'test1', password: 'testerPassword' })
        cy.visit('http://localhost:3000')
      })

      it('blog cannot be deleted if user didnot created it ', function () {
        // displaying blog details
        cy.contains('how to do cypress testing2.').click()
        // checking if the delete button is not shown incase the blog isn't created by loggedUser
        cy.get('.deleteButton').should('not.exist')
      })

    })

    describe('ordering blogs', function() {
      beforeEach(function() {

        // creating new blog by Matti Luukkainen
        cy.createBlog({
          title: 'how to do cypress testing1.',
          author: 'cypress',
          url:'www.cypress.com',
          likes:20
        })
        // creating new blog by Matti Luukkainen
        cy.createBlog({
          title: 'how to do cypress testing2.',
          author: 'cypress',
          url:'www.cypress.com',
          likes:10
        })
        // creating new blog by Matti Luukkainen
        cy.createBlog({
          title: 'how to do cypress testing3.',
          author: 'cypress',
          url:'www.cypress.com',
          likes:12
        })
        // creating new blog by Matti Luukkainen
        cy.createBlog({
          title: 'how to do cypress testing4.',
          author: 'cypress',
          url:'www.cypress.com',
          likes:40
        })

      })

    })

  })

})
