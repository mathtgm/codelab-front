import { Component, Injector } from '@angular/core';
import { IProduto } from '../produto.interface';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ProdutoService } from '../produto.service';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];

const mat = [
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule
]

@Component({
  selector: 'cl-produto-cadastro',
  standalone: true,
  imports: [
    ...actions,
    ...mat,
    PageLayoutComponent,
    FormFieldsListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent extends BaseCadastroComponent<IProduto> {

  tmpImg: string = '../../../assets/images/image-not-found.png';

  constructor(private readonly _produtoService: ProdutoService, protected override readonly _injector: Injector) {
    super(_produtoService, _injector);
  }

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Drescriçao',
      formControlName: 'descricao',
      placeholder: 'Leite Desnatado',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Preço venda (R$)',
      formControlName: 'precoVenda',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Preço custo (R$)',
      formControlName: 'precoCusto',
      placeholder: '',
    },
    {
      type: EFieldType.Checkbox,
      class: 'grid-2',
      label: 'Ativo?',
      formControlName: 'ativo',
      placeholder: '',
    },
  ];

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    descricao: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    precoCusto: new FormControl(null, [Validators.min(0.001)]),
    precoVenda: new FormControl(null, [Validators.min(0.01)]),
    imagem: new FormControl(),
    ativo: new FormControl(Validators.required),
    codigoBarras: new FormControl()
  });

  override save(addNew?: boolean): void {
    this.handleImageBaseDataURL();
    super.save(addNew);
  }

  fileBrowser() {
    document.getElementById('arquivo')!.click();
  }

  getFileImage(): File {
    let file = document.getElementById('arquivo') as HTMLInputElement;
    return file.files![0];
  }

  getElementImage(): HTMLInputElement {
    return document.getElementById('imagem') as HTMLInputElement;
  }

  imageReload(): void {
    if (this.getFileImage()) {
      let fileImage = this.getFileImage();
      this.fileToDataURL(fileImage)
        .then(data => {
          this.tmpImg = data as string
          this.cadastroForm.get('imagem')!.setValue(data);
        });
    }
  }

  fileToDataURL(imagem: any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagem as Blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleImageBaseDataURL() {
    let prefix = ''
    if(this.tmpImg.split(',')[1] === undefined) {
      console.log(this.cadastroForm.get('imagem')!.getRawValue())
      let img = this.cadastroForm.get('imagem')?.getRawValue();
      let imgURL = this.fileToDataURL(img);
      this.cadastroForm.get('imagem')?.setValue(imgURL);
      this.cadastroForm.get('imagem')?.getRawValue();
    }
    
  }

  removeImage() {
    let fileInput = document.getElementById('arquivo') as HTMLInputElement;
    fileInput.files = null;
    this.tmpImg = '../../../assets/images/image-not-found.png';
    this.cadastroForm.get('imagem')!.setValue('');
  }

  addCodBarraInputFormControl() {
    let codBarrasInput = document.getElementById('codBarrasInput') as HTMLInputElement;

    if (codBarrasInput.value) {
      this.cadastroForm.get('codigoBarras')!.value.push(codBarrasInput.value);
      codBarrasInput.value = '';
    }

  }

  removeCodBarraInputFormControl(codBarras: string) {
    let codBarrasIndex = this.cadastroForm.get('codigoBarras')!.value.findIndex((item: string) => item === codBarras);
    this.cadastroForm.get('codigoBarras')!.value.splice(codBarrasIndex, 1);
  }
}