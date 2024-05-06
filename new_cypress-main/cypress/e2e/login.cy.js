
import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Авторизация и восстановление пароля', function () {
    
    beforeEach('Начало теста', function () {
        cy.visit('/');
        });
  
    afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible');
        });

    it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login);                                // Вводим верный логин
        cy.get(main_page.password).type(data.password);                          // Вводим верный пароль
        cy.get(main_page.login_button).click();                                  // Нажимаем кнопку войти
        cy.get(result_page.title).contains('Авторизация прошла успешно');        // Проверяем текст в поле
        cy.get(result_page.title).should('be.visible');                          // Проверяем что текст виден
    })

   it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();                                 // Нажимаем кнопку восстановить
        cy.get(recovery_password_page.email).type('salykindenis@gmail.com');      // Вводим почту для восстановления
        cy.get(recovery_password_page.send_button).click();                       // Кликаем на кнопку восстановить
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяем текст в поле
    })

   it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);                                 // Вводим верный логин
        cy.get(main_page.password).type('iLoveqastudio7');                        // Вводим неверный пароль
        cy.get(main_page.login_button).click();                                   // Нажимаем кнопку войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');       // Проверяем текст в поле
        cy.get(result_page.title).should('be.visible');                           // Проверяем что текс виден
    })

   it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('jerman@dolnikov.ru');                        // Вводим неверный логин
        cy.get(main_page.password).type(data.password);                            // Вводим верный пароль
        cy.get(main_page.login_button).click();                                    // Нажимаем кнопку войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');        // Проверяем текст в поле
        cy.get(result_page.title).should('be.visible');                            // Проверяем что текс виден
    })

   it('Отсутствует @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');                         // Вводим неверный логин
        cy.get(main_page.password).type(data.password);                            // Вводим верный пароль
        cy.get(main_page.login_button).click();                                    // Нажимаем кнопку войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');  // Проверяем текст в поле
        cy.get(result_page.title).should('be.visible');                            // Проверяем что текс виден
    })

   it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');                        // Вводим неверный логин
        cy.get(main_page.password).type(data.password);                            // Вводим верный пароль
        cy.get(main_page.login_button).click();                                    // Нажимаем кнопку войти
        cy.get(result_page.title).contains('Авторизация прошла успешно');          // Проверяем текст в поле
        cy.get(result_page.title).should('be.visible');                            // Проверяем что текс виден
    })
})


// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
// npx cypress open