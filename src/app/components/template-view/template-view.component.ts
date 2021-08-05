import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../services/template/template.service';
import {TerminologyServerService} from '../../services/terminologyServer/terminology-server.service';
import {ModalService} from '../../services/modal/modal.service';

@Component({
    selector: 'app-template-view',
    templateUrl: './template-view.component.html',
    styleUrls: ['./template-view.component.scss']
})
export class TemplateViewComponent implements OnInit {

    activeTemplate: any;
    activeTemplateSubscription: Subscription;
    relationshipTypes: any[];
    relationshipTargets: any[];
    colors = [
        'spring-rain',
        'london-hue',
        'vanilla',
        'careys-pink',
        'clam-shell',
        'green-mist',
        'perano',
        'mercury',
        'morning-glory',
        'dull-lavender'
    ];

    constructor(private templateService: TemplateService,
                private terminologyService: TerminologyServerService,
                public modalService: ModalService) {
        this.activeTemplateSubscription = this.templateService.getActiveTemplate().subscribe(data => {
            this.activeTemplate = data;
            this.relationshipTypes = null;
            this.relationshipTargets = null;
            if (data) {
                this.collectRelationshipTypeIds();
                this.collectRelationshipTargetIds();
            }
        });
    }

    ngOnInit(): void {
    }

    matchRelationshipType(id) {
        if (this.relationshipTypes) {
            return this.relationshipTypes.find(item => item.conceptId === id).pt.term || '';
        }
    }

    matchRelationshipTarget(id) {
        if (this.relationshipTargets) {
            return this.relationshipTargets.find(item => item.conceptId === id).fsn.term || '';
        }
    }

    getDefinitionStatus(id) {
        let status = '';

        if (this.relationshipTargets) {
            status = this.relationshipTargets.find(item => item.conceptId === id).definitionStatus || '';
        }

        return status === 'PRIMITIVE' ? 'blue' : 'purple';
    }

    collectRelationshipTypeIds() {
        const relationshipIds = [];

        this.activeTemplate.conceptOutline.classAxioms.forEach(item => {
            item.relationships.forEach(relationship => {
                if (relationship.type) {
                    relationshipIds.push(relationship.type.conceptId);
                }
            });
        });

        this.terminologyService.getConcepts(relationshipIds).subscribe(data => {
            this.relationshipTypes = data['items'];
        });
    }

    collectRelationshipTargetIds() {
        const relationshipIds = [];

        this.activeTemplate.conceptOutline.classAxioms.forEach(item => {
            item.relationships.forEach(relationship => {
                if (relationship.target) {
                    relationshipIds.push(relationship.target.conceptId);
                }
            });
        });

        this.terminologyService.getConcepts(relationshipIds).subscribe(data => {
            this.relationshipTargets = data['items'];
        });
    }

    caseSignificance(caseSignificance): string {
        switch (caseSignificance) {
            case 'CASE_INSENSITIVE':
                return 'ci';
            case 'CASE_SENSITIVE':
                return 'CS';
            case 'INITIAL_CHARACTER_CASE_INSENSITIVE':
                return 'cI';
        }
    }

    readableCaseSignificance(caseSignificance): string {
        switch (caseSignificance) {
            case 'CASE_INSENSITIVE':
                return 'Entire Term Case Insensitive';
            case 'CASE_SENSITIVE':
                return 'Entire Term Case Sensitive';
            case 'INITIAL_CHARACTER_CASE_INSENSITIVE':
                return 'Only Initial Character Case Insensitive';
        }
    }

    acceptabilityMap(acceptabilityMap): string[] {
        const newMap = [];

        for (const key in acceptabilityMap) {
            if (acceptabilityMap.hasOwnProperty(key)) {
                const value = acceptabilityMap[key];

                switch (key) {
                    case '20581000087109':
                        newMap.push('fr-CA:' + this.acceptabilityValue(value));
                        break;
                    case '19491000087109':
                        newMap.push('en-CA:' + this.acceptabilityValue(value));
                        break;
                    case '900000000000508004':
                        newMap.push('GB:' + this.acceptabilityValue(value));
                        break;
                    case '900000000000509007':
                        newMap.push('US:' + this.acceptabilityValue(value));
                        break;
                    case '450828004':
                        newMap.push('ES:' + this.acceptabilityValue(value));
                        break;
                    case '5641000179103':
                        newMap.push('ES-UY:' + this.acceptabilityValue(value));
                        break;
                    case '554461000005103':
                        newMap.push('DA:' + this.acceptabilityValue(value));
                        break;
                    case '46011000052107':
                        newMap.push('SV:' + this.acceptabilityValue(value));
                        break;
                    case '32570271000036106':
                        newMap.push('AU:' + this.acceptabilityValue(value));
                        break;
                    case '11000146104':
                        newMap.push('NL:' + this.acceptabilityValue(value));
                        break;
                    case '31000146106':
                        newMap.push('NL:' + this.acceptabilityValue(value));
                        break;
                    case '31000172101':
                        newMap.push('NL:' + this.acceptabilityValue(value));
                        break;
                    case '15551000146102':
                        newMap.push('NL-PF:' + this.acceptabilityValue(value));
                        break;
                    case '61000202103':
                        newMap.push('NO-NB:' + this.acceptabilityValue(value));
                        break;
                    case '91000202106':
                        newMap.push('NO-NN:' + this.acceptabilityValue(value));
                        break;
                    case '21000172104':
                        newMap.push('FR:' + this.acceptabilityValue(value));
                        break;
                    case '21000220103':
                        newMap.push('IE:' + this.acceptabilityValue(value));
                        break;
                    case '71000181105':
                        newMap.push('ET:' + this.acceptabilityValue(value));
                        break;
                    case '281000210109':
                        newMap.push('NZ-PF:' + this.acceptabilityValue(value));
                        break;
                    case '271000210107':
                        newMap.push('NZ:' + this.acceptabilityValue(value));
                        break;
                    case '722128001':
                        newMap.push('ZH:' + this.acceptabilityValue(value));
                        break;
                    case '291000210106':
                        newMap.push('MI:' + this.acceptabilityValue(value));
                        break;
                    case '21000241105':
                        newMap.push('FR:' + this.acceptabilityValue(value));
                        break;
                    case '722130004':
                        newMap.push('DE:' + this.acceptabilityValue(value));
                        break;
                }
            }
        }

        return newMap;
    }

    acceptabilityValue(value): string {
        switch (value) {
            case 'PREFERRED':
                return 'P';
            case 'ACCEPTABLE':
                return 'A';
            case 'NOT_ACCEPTABLE':
                return 'N';
        }
    }

    readableAcceptabilityMap(acceptabilityMap): string {
        for (const key in acceptabilityMap) {
            if (acceptabilityMap.hasOwnProperty(key)) {
                switch (acceptabilityMap[key]) {
                    case 'PREFERRED':
                        return 'Preferred';
                    case 'ACCEPTABLE':
                        return 'Acceptable';
                    case 'NOT_ACCEPTABLE':
                        return 'Not Acceptable';
                }
            }
        }
    }

    addHighlight(slotName) {
        if (slotName) {
            Array.from(document.getElementsByClassName('slot')).forEach(slot => {
                this.activeTemplate.lexicalTemplates.forEach(lexical => {
                    if ((slotName === lexical.takeFSNFromSlot) &&
                        (slot.innerHTML.replace('[[', '[').replace(']]', ']') === lexical.displayName)) {
                        slot.classList.add('highlight');
                    }
                });
            });

            // Array.from(document.getElementsByClassName('color-bar')).forEach(bar => {
            //     this.activeTemplate.lexicalTemplates.forEach(lexical => {
            //         if (slotName === lexical.takeFSNFromSlot) {
            //             // console.log('slotName: ' + slotName + ' --- lexical: ', lexical);
            //             bar.classList.add('highlight');
            //         }
            //     });
            // });
        }
    }

    removeHighlight(slotName) {
        if (slotName) {
            Array.from(document.getElementsByClassName('slot')).forEach(slot => {
                this.activeTemplate.lexicalTemplates.forEach(lexical => {
                    if ((slotName === lexical.takeFSNFromSlot) &&
                        (slot.innerHTML.replace('[[', '[').replace(']]', ']') === lexical.displayName)) {
                        slot.classList.remove('highlight');
                    }
                });
            });

            // Array.from(document.getElementsByClassName('color-bar')).forEach(bar => {
            //     this.activeTemplate.lexicalTemplates.forEach(lexical => {
            //         if (slotName === lexical.takeFSNFromSlot) {
            //             bar.classList.remove('highlight');
            //         }
            //     });
            // });
        }
    }

    constructTemplate(term): string {
        const open = '<span class="slot">[[';
        const close = ']]</span>';
        let completeTerm = term.replaceAll('[[', open).replaceAll(']]', close);
        this.colors.forEach((color) => {
            completeTerm = completeTerm.replace('<span class="slot">', '<span class="slot ' + color + '">');
        });
        return completeTerm;
    }

    matchColours(slotName): string {
        let color = '';

        const lexicalTemplate = this.activeTemplate.lexicalTemplates.find(lexical => slotName === lexical.takeFSNFromSlot);

        if (lexicalTemplate && slotName) {
            Array.from(document.getElementsByClassName('slot')).forEach(slot => {
                if (slot.innerHTML.includes(lexicalTemplate.displayName)) {
                    color = slot.classList[1];
                }
            });
        }
        return color;
    }

    groupCheck(number): boolean {
        return number % 2 === 0;
    }

    cardinalityCheck(number): number {
        return parseInt(number, 2);
    }

    definitionStatusCheck(status): boolean {
        return status === 'FULLY_DEFINED';
    }
}
