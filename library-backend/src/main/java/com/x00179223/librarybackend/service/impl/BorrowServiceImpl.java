package com.x00179223.librarybackend.service.impl;

import com.x00179223.librarybackend.model.Borrow;
import com.x00179223.librarybackend.repository.BorrowRepository;
import com.x00179223.librarybackend.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowServiceImpl implements IService<Borrow> {
    @Autowired
    private BorrowRepository borrowRepository;

    @Override
    public Collection<Borrow> findAll(){
        return borrowRepository.findAll();
    }

    @Override
    public Optional<Borrow> findById(Long id) {
        return borrowRepository.findById(id);
    }

    @Override
    public Borrow saveOrUpdate(Borrow borrow) {
        return borrowRepository.saveAndFlush(borrow);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            borrowRepository.deleteById(id);
            jsonObject.put("message", "Borrow deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    public List<Borrow> findOverdueBorrows() {
        return borrowRepository.findByEndDateBeforeAndReturnedFalse(LocalDate.now());
    }

    public Double calculateFine(Borrow borrow) {
        LocalDate returnDate = borrow.getEndDate();
        LocalDate today = LocalDate.now();

        if (today.isAfter(returnDate)) {
            long daysLate = today.toEpochDay() - returnDate.toEpochDay();
            double fineAmount = daysLate * 0.1;
            return fineAmount;
        }

        return 0.0;
    }

}
