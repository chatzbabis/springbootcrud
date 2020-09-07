<template>
  <el-dialog type="warning" title="Διαχείριση Προμηθευτή" :visible="visible" :modal="true"
             :close-on-click-modal="false"
             :close-on-press-escape="false" :modal-append-to-body="false" :show-close="false" width="75%"
             @close="clearValidation">

    <el-card>
    <el-form ref="supplierForm" :model="supplier" :rules="rules" label-position="top">

      <el-row :gutter="20">
        <!-- LEFT COLUMN -->
        <el-col :span="12">

          <el-form-item label="Εισάγετε το όνομα της εταιρείας"
                        prop="companyName">
            <el-input prefix-icon="fa fa-companyName"
                      v-model="supplier.companyName"
                      placeholder="Όνομα εταιρείας"
                      autoComplete="companyName">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε το όνομα του προμηθευτή"
                        prop="firstName">
            <el-input prefix-icon="fa fa-firstName"
                      v-model="supplier.firstName"
                      placeholder="Όνομα"
                      autoComplete="firstName">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε το επώνυμο του προμηθευτή"
                        prop="lastName">
            <el-input prefix-icon="fa fa-lastName"
                      v-model="supplier.lastName"
                      placeholder="Επώνυμο"
                      autoComplete="lastName">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε τη διεύθυνση του προμηθευτή"
                        prop="address">
            <el-input prefix-icon="fa fa-address"
                      v-model="supplier.address"
                      placeholder="διεύθυνση"
                      autoComplete="address">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε τον τ.κ του προμηθευτή"
                        prop="zipCode">
            <el-input prefix-icon="fa fa-zipCode"
                      v-model="supplier.zipCode"
                      placeholder="ταχ/κώδικας"
                      autoComplete="zipCode">
            </el-input>
          </el-form-item>

        </el-col>

        <!-- RIGHT COLUMN -->
        <el-col :span="12">

          <el-form-item label="Εισάγετε την πόλη του προμηθευτή"
                        prop="city">
            <el-input prefix-icon="fa fa-city"
                      v-model="supplier.city"
                      placeholder="πόλη"
                      autoComplete="city">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε την χώρα του προμηθευτή"
                        prop="country">
            <el-input prefix-icon="fa fa-country"
                      v-model="supplier.country"
                      placeholder="χώρα"
                      autoComplete="country">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε το ΑΦΜ του προμηθευτή"
                        prop="vatNumber">
            <el-input prefix-icon="fa fa-vatNumber"
                      v-model="supplier.vatNumber"
                      placeholder="ΑΦΜ"
                      autoComplete="vatNumber">
            </el-input>
          </el-form-item>

          <el-form-item label="Εισάγετε τη ΔΟΥ του προμηθευτή"
                        prop="irsOffice">
            <el-input prefix-icon="fa fa-irsOffice"
                      v-model="supplier.irsOffice"
                      placeholder="ΔΟΥ"
                      autoComplete="irsOffice">
            </el-input>
          </el-form-item>

        </el-col>
      </el-row>

    </el-form>

      <el-row>
        <el-col style="text-align: right">
          <el-button type="success"
                     icon="fa fa-save"
                     @click="save"> Αποθήκευση </el-button>

          <el-button type="danger"
                     icon="fa fa-remove"
                     @click="confirmDelete"
                     :disabled="!isDeletable"> Διαγραφή </el-button>
        </el-col>
      </el-row>
    </el-card>

    <div slot="footer" class="dialog-footer card-footer">
      <el-button type="warning"
                 icon="el-icon-back"
                 @click="cancel"> Επιστροφή </el-button>
    </div>

  </el-dialog>
</template>
<script src="./SupplierVM.js"></script>
