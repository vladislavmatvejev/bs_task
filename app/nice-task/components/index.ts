import { Component} from '@angular/core';
import {EmitterService} from '../../emitter.service';

@Component({
    //selector: 'comment-widget',
    template: `
        <div>
            <p>{{pageTitle}}</p>
            <!--<comment-form [listId]="listId" [editId]="editId"></comment-form>-->
            <api-nav [navId]="navId" [chartId]="chartId"></api-nav>
            <my-chart [navId]="navId" [chartId]="chartId"></my-chart>
        </div>
    `,
})
export class SpecialComponent {
    // Event tracking properties
    public pageTitle: string = 'Extra Special';
    private navId = 'COMMENT_COMPONENT_LIST';
    private chartId = 'COMMENT_COMPONENT_EDIT';
}
