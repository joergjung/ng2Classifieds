import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'app',
    template: `
        <div class="row">
            <div *ngFor="#classified of classifieds" class="col-sm-4">
                <div class="thumbnail">
                    <img src="{{ classified.image }}">
                    <div class="caption">
                        <h2>{{ classified.title }}</h2>
                        <h3>{{ classified.price | currency:'USD':true }}</h3>
                        <p>{{ classified.description }}</p>
                        <div *ngIf="classified.showContact">
                            <p>{{ classified.contact.name }}</p>
                            <p>{{ classified.contact.phone }}</p>
                            <p>{{ classified.contact.email }}</p> 
                        </div>
                        <button
                            (click)="classified.showContact = true"
                            *ngIf="!classified.showContact"
                            class="btn btn-primary">
                            Contact
                        </button>
                        
                        <button
                            (click)="classified.showContact = false"
                            *ngIf="classified.showContact"
                            class="btn btn-primary">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    // add custom css style
    styles: [`
        .thumbnail { height: 500px; }
    `]
    
})

export class App {
    ref: Firebase = new Firebase('https://jj-ngclassifieds.firebaseio.com/');
    classifieds: Array<Object> = [];
    
    constructor() {
        // get firebase data
        let classifieds = this.classifieds;
        this.ref.on('value', function(data) {
            data.forEach(function(child) {
                classifieds.push(child.val());
            })
        })
    }
}

bootstrap(App);
