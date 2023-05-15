import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DndDirective } from './dnd.directive';
import { Component, ViewChild, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `<div uiDnd #dndDirective="uiDnd"></div>`
})
class TestComponent {
  @ViewChild('dndDirective', {static: true}) dndDirective: DndDirective;
}

describe('DndDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveInstance: DndDirective;
  let divEL: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DndDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEL = fixture.debugElement.query(By.css('div'))
    directiveInstance = fixture.componentInstance.dndDirective;
  });

  it('should add class "active" on dragover', () => {
    const event = createMockEvent();
    divEL.triggerEventHandler('dragover', event);
    expect(directiveInstance.fileInner).toBe(true);
  });

  it('should remove class "active" on dragleave', () => {
    const event = createMockEvent();
    divEL.triggerEventHandler('dragleave', event);
    expect(directiveInstance.fileInner).toBe(false);
  });

  it('should emit "fileDropped" event with files on drop', () => {
    const files = [createMockFile()];
    const event = createMockDropEvent(files);

    spyOn(directiveInstance.fileDropped, 'emit');
    divEL.triggerEventHandler('drop', event);

    expect(directiveInstance.fileInner).toBe(false);
    expect(directiveInstance.fileDropped.emit).toHaveBeenCalledWith(files);
  });

  function createMockEvent(): any {
    return { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
  }

  function createMockDropEvent(files: any[]): any {
    const event = createMockEvent();
    event.dataTransfer = { files: files };
    return event;
  }

  function createMockFile(): any {
    return {
      name: 'Test'
    };
  }
});


