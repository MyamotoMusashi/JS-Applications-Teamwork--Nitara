import { userModule } from 'user';
import 'cryptoJS';
import 'login-register';
import 'jquery';
import { users } from 'db';

mocha.setup('bdd');
var expect = chai.expect;


describe('Create user', function() {

    it('expects createUser() for return current user', function() {

        let hashPasword = CryptoJS.SHA1('veselin93').toString();

        var user = {
            _firstname: 'Vesko',
            _lastname: 'Telerik',
            _password: hashPasword,
            _email: 'vesko@abv.bg'
        };

        let userRrsoult = userModule.createUser('Vesko', 'Telerik', hashPasword, 'vesko@abv.bg');

        expect(userRrsoult._firstname).to.equal(user._firstname);
        expect(userRrsoult._lastname).to.equal(user._lastname);
        expect(userRrsoult._password).to.equal(user._password);
        expect(userRrsoult._firstname).to.equal(user._firstname);


    });

    it('expects createUser() throw Error', function() {

        try {
            userModule.createUser(undefined, 'Telerik', '12212', 'vesko@abv.bg');
        } catch (err) {
            expect(err).to.eql(new Error('User firstname param cannot be undefined!'));
        }

    });

});


describe('Check login user', function() {

    it('should correct login', function() {

        sinon.stub(users, 'loginUser', function(login, pass) {
            return new Promise((resolve, reject) => {
                let result = {
                    name: `Veselin Krustev`,
                    authKey: '213123131'
                };
                resolve(result);
            })
        })

        $('#sign-in-btn').click();

        //expect(showHideLogin.called).to.be.true;
        //expect(showHideLogin()).to.have.been.called;

        expect(`Veselin Krustev`).to.equal(localStorage['username-key']);
        expect(`213123131`).to.equal(localStorage['authkey-key']);

    });
});

describe('Check register user', function() {

    it('should succes register', function() {

        sinon.stub(users, 'registerUser', function(user) {
            return new Promise((resolve, reject) => {
                resolve('Successfully registred user!');
            })
        })

        $('#register').click();

        //expect(showHideLogin.called).to.be.true;
        //expect(showHideLogin()).to.have.been.called;

    });
});

mocha.run();